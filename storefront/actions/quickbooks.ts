"use server";

import { revalidatePath } from "next/cache";
import {
  ChartOfAccount,
  GeneralJournalVoucher,
  BalanceSheetReport,
  TrialBalanceReport,
  ARAgingBucket,
} from "@/types/quickbooks";
import {
  INITIAL_CHART_OF_ACCOUNTS,
  INITIAL_JOURNAL_VOUCHERS,
  INITIAL_AR_AGING,
} from "@/data/chart_of_accounts";

/**
 * 1. Fetch Chart of Accounts
 */
export async function getChartOfAccountsAction(): Promise<{
  success: boolean;
  accounts: ChartOfAccount[];
}> {
  return {
    success: true,
    accounts: INITIAL_CHART_OF_ACCOUNTS,
  };
}

/**
 * 2. Fetch General Journal Vouchers
 */
export async function getJournalVouchersAction(): Promise<{
  success: boolean;
  vouchers: GeneralJournalVoucher[];
}> {
  return {
    success: true,
    vouchers: INITIAL_JOURNAL_VOUCHERS,
  };
}

/**
 * 3. Add a new General Journal Entry (with Double-Entry balance enforcement)
 */
export async function addJournalVoucherAction(
  voucher: Omit<GeneralJournalVoucher, "id" | "is_balanced" | "total_debit" | "total_credit" | "created_at">
): Promise<{ success: boolean; data?: GeneralJournalVoucher; error?: string }> {
  try {
    const totalDebit = voucher.lines.reduce((sum, l) => sum + (Number(l.debit) || 0), 0);
    const totalCredit = voucher.lines.reduce((sum, l) => sum + (Number(l.credit) || 0), 0);

    const diff = Math.abs(totalDebit - totalCredit);
    if (diff > 0.01) {
      return {
        success: false,
        error: `Journal entry is out of balance. Total Debit: $${totalDebit.toFixed(2)}, Total Credit: $${totalCredit.toFixed(2)}. Difference: $${diff.toFixed(2)}`,
      };
    }

    const newVoucher: GeneralJournalVoucher = {
      ...voucher,
      id: `jv-${Date.now()}`,
      total_debit: totalDebit,
      total_credit: totalCredit,
      is_balanced: true,
      created_at: new Date().toISOString(),
    };

    revalidatePath("/[locale]/admin/finance");

    return {
      success: true,
      data: newVoucher,
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * 4. Generate QuickBooks Financial Statements: Balance Sheet, Trial Balance, A/R Aging
 */
export async function getQuickBooksReportsAction(): Promise<{
  success: boolean;
  balanceSheet: BalanceSheetReport;
  trialBalance: TrialBalanceReport;
  arAging: ARAgingBucket[];
}> {
  const accounts = INITIAL_CHART_OF_ACCOUNTS;

  // Assets
  const currentAssetAccounts = accounts.filter(
    (a) => a.category === "ASSET" && a.subtype !== "FIXED_ASSET"
  );
  const fixedAssetAccounts = accounts.filter(
    (a) => a.category === "ASSET" && a.subtype === "FIXED_ASSET"
  );

  const totalCurrentAssets = currentAssetAccounts.reduce((sum, a) => sum + a.balance_usd, 0);
  const totalFixedAssets = fixedAssetAccounts.reduce((sum, a) => sum + a.balance_usd, 0);
  const totalAssets = totalCurrentAssets + totalFixedAssets;

  // Liabilities
  const currentLiabilityAccounts = accounts.filter(
    (a) => a.category === "LIABILITY" && a.subtype !== "LONG_TERM_LIABILITY"
  );
  const longTermLiabilityAccounts = accounts.filter(
    (a) => a.category === "LIABILITY" && a.subtype === "LONG_TERM_LIABILITY"
  );

  const totalCurrentLiabilities = currentLiabilityAccounts.reduce((sum, a) => sum + a.balance_usd, 0);
  const totalLongTermLiabilities = longTermLiabilityAccounts.reduce((sum, a) => sum + a.balance_usd, 0);
  const totalLiabilities = totalCurrentLiabilities + totalLongTermLiabilities;

  // Equity & Current Year Net Income
  const totalRevenue = accounts.filter((a) => a.category === "REVENUE").reduce((sum, a) => sum + a.balance_usd, 0);
  const totalCOGS = accounts.filter((a) => a.category === "COGS").reduce((sum, a) => sum + a.balance_usd, 0);
  const totalExpenses = accounts.filter((a) => a.category === "EXPENSE").reduce((sum, a) => sum + a.balance_usd, 0);
  const netIncome = totalRevenue - totalCOGS - totalExpenses;

  const equityAccounts = accounts.filter((a) => a.category === "EQUITY");
  const baseEquity = equityAccounts.reduce((sum, a) => sum + a.balance_usd, 0);
  const totalEquity = baseEquity + netIncome;

  const totalLiabilitiesAndEquity = totalLiabilities + totalEquity;

  const balanceSheet: BalanceSheetReport = {
    as_of_date: new Date().toISOString().split("T")[0],
    assets: {
      current_assets: currentAssetAccounts.map((a) => ({ name: `${a.account_code} - ${a.name}`, amount: a.balance_usd })),
      total_current_assets: totalCurrentAssets,
      fixed_assets: fixedAssetAccounts.map((a) => ({ name: `${a.account_code} - ${a.name}`, amount: a.balance_usd })),
      total_fixed_assets: totalFixedAssets,
      total_assets: totalAssets,
    },
    liabilities: {
      current_liabilities: currentLiabilityAccounts.map((a) => ({ name: `${a.account_code} - ${a.name}`, amount: a.balance_usd })),
      total_current_liabilities: totalCurrentLiabilities,
      long_term_liabilities: longTermLiabilityAccounts.map((a) => ({ name: `${a.account_code} - ${a.name}`, amount: a.balance_usd })),
      total_long_term_liabilities: totalLongTermLiabilities,
      total_liabilities: totalLiabilities,
    },
    equity: {
      equity_items: equityAccounts.map((a) => ({ name: `${a.account_code} - ${a.name}`, amount: a.balance_usd })),
      net_income_current_year: netIncome,
      total_equity: totalEquity,
    },
    total_liabilities_and_equity: totalLiabilitiesAndEquity,
    is_balanced: Math.abs(totalAssets - totalLiabilitiesAndEquity) < 1.0,
  };

  // Trial Balance Rows
  const trialBalanceRows = accounts.map((a) => {
    let debit = 0;
    let credit = 0;
    if (a.category === "ASSET" || a.category === "COGS" || a.category === "EXPENSE") {
      debit = a.balance_usd;
    } else {
      credit = a.balance_usd;
    }
    return {
      account_code: a.account_code,
      account_name: a.name,
      account_name_lo: a.name_lo,
      category: a.category,
      debit,
      credit,
    };
  });

  const totalTBDebit = trialBalanceRows.reduce((sum, r) => sum + r.debit, 0);
  const totalTBCredit = trialBalanceRows.reduce((sum, r) => sum + r.credit, 0);

  const trialBalance: TrialBalanceReport = {
    as_of_date: new Date().toISOString().split("T")[0],
    rows: trialBalanceRows,
    total_debit: totalTBDebit,
    total_credit: totalTBCredit,
    is_balanced: Math.abs(totalTBDebit - totalTBCredit) < 1.0,
  };

  return {
    success: true,
    balanceSheet,
    trialBalance,
    arAging: INITIAL_AR_AGING,
  };
}
