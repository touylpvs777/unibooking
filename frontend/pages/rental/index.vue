<template>
  <div class="dk-rental-page">
    <header class="topbar">
      <nav class="main-nav" aria-label="Main navigation">
        <a href="#" class="nav-link active">Overview</a>
        <a href="#" class="nav-link">Contracts</a>
        <a href="#" class="nav-link">Dispatch</a>
        <a href="#" class="nav-link">Inspections</a>
        <a href="#" class="nav-link">Billing</a>
      </nav>
    </header>

    <main class="page-shell">
      <section class="page-header">
        <div>
          <p class="eyebrow">Rental Operations</p>
          <h1>Rental Contracts</h1>
        </div>

        <button type="button" class="primary-btn" @click="openNewContract">
          + New Contract
        </button>
      </section>

      <section class="toolbar">
        <label class="search-box">
          <span>Search</span>
          <input
            v-model="search"
            type="text"
            placeholder="Contract, customer, equipment..."
          />
        </label>

        <div class="status-pills">
          <span class="pill pill-blue">{{ activeContracts }} Active</span>
          <span class="pill pill-slate">{{ dueSoon }} Due Soon</span>
        </div>
      </section>

      <section class="table-card">
        <table>
          <thead>
            <tr>
              <th>Contract</th>
              <th>Customer</th>
              <th>Equipment</th>
              <th>Term</th>
              <th>Status</th>
              <th>Value</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="contract in filteredContracts" :key="contract.id">
              <td>
                <div class="contract-id">{{ contract.contractNumber }}</div>
              </td>

              <td>
                <div class="customer-name">{{ contract.customer }}</div>
              </td>

              <td>
                <div class="equipment-name">{{ contract.equipment }}</div>
              </td>

              <td>{{ contract.term }}</td>

              <td>
                <span :class="['status-badge', contract.status.toLowerCase()]">
                  {{ contract.status }}
                </span>
              </td>

              <td>{{ formatCurrency(contract.value) }}</td>

              <td>
                <button type="button" class="table-action" @click="viewContract(contract)">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

type ContractStatus = 'Active' | 'Due Soon' | 'Overdue' | 'Draft';

interface RentalContractRow {
  id: number;
  contractNumber: string;
  customer: string;
  equipment: string;
  term: string;
  status: ContractStatus;
  value: number;
}

const search = ref('');

const contracts = ref<RentalContractRow[]>([
  {
    id: 1,
    contractNumber: 'RC-1024',
    customer: 'Northwind Logistics',
    equipment: 'CAT 320GC Excavator',
    term: 'Apr 08 – Jun 08',
    status: 'Active',
    value: 12650,
  },
  {
    id: 2,
    contractNumber: 'RC-1029',
    customer: 'Atlas Builders',
    equipment: 'JCB 3CX Backhoe',
    term: 'Apr 11 – May 11',
    status: 'Due Soon',
    value: 8450,
  },
  {
    id: 3,
    contractNumber: 'RC-1035',
    customer: 'Kensington Civils',
    equipment: 'Volvo L120 Loader',
    term: 'Mar 24 – Apr 24',
    status: 'Overdue',
    value: 15300,
  },
  {
    id: 4,
    contractNumber: 'RC-1042',
    customer: 'Lighthouse FM',
    equipment: 'Scania Hook Lift',
    term: 'Draft',
    status: 'Draft',
    value: 5200,
  },
]);

const filteredContracts = computed(() => {
  const term = search.value.trim().toLowerCase();

  if (!term) {
    return contracts.value;
  }

  return contracts.value.filter((contract) =>
    [
      contract.contractNumber,
      contract.customer,
      contract.equipment,
      contract.term,
      contract.status,
    ]
      .join(' ')
      .toLowerCase()
      .includes(term),
  );
});

const activeContracts = computed(
  () => contracts.value.filter((item) => item.status === 'Active').length,
);

const dueSoon = computed(
  () => contracts.value.filter((item) => item.status === 'Due Soon').length,
);

function openNewContract() {
  console.log('Open new rental contract form');
}

function viewContract(contract: RentalContractRow) {
  console.log('Open contract details', contract);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value);
}
</script>

<style scoped>
:global(body) {
  margin: 0;
  background: #f3f6fb;
  color: #132a52;
  font-family: Inter, 'Segoe UI', sans-serif;
}

.dk-rental-page {
  min-height: 100vh;
  background: #f5f7fb;
}

.topbar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #ffffff;
  border-bottom: 1px solid #dfe7f3;
  position: sticky;
  top: 0;
  z-index: 10;
}

.main-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.nav-link {
  color: #0f2c5c;
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  transition: opacity 0.2s ease;
}

.nav-link:hover,
.nav-link.active {
  opacity: 1;
}

.page-shell {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.eyebrow {
  margin: 0 0 0.4rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #5573a3;
}

h1 {
  margin: 0;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  color: #0c1f42;
  letter-spacing: -0.04em;
}

.primary-btn {
  border: none;
  background: linear-gradient(135deg, #0d2f70, #123d8f);
  color: #fff;
  height: 44px;
  padding: 0 1.2rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.96rem;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(13, 47, 112, 0.18);
  transition: transform 0.15s ease;
}

.primary-btn:hover {
  transform: translateY(-1px);
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.search-box {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: #45608e;
}

.search-box input {
  width: min(420px, 70vw);
  height: 42px;
  border: 1px solid #d7dfed;
  background: white;
  border-radius: 10px;
  padding: 0 0.9rem;
  color: #0b2048;
  font-size: 0.95rem;
  outline: none;
}

.search-box input:focus {
  border-color: #7aa2d9;
  box-shadow: 0 0 0 4px rgba(122, 162, 217, 0.12);
}

.status-pills {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.pill {
  display: inline-flex;
  align-items: center;
  padding: 0.55rem 0.8rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
}

.pill-blue {
  background: #eaf1ff;
  color: #173f8d;
}

.pill-slate {
  background: #edf1f7;
  color: #42567a;
}

.table-card {
  background: #fff;
  border: 1px solid #e4ebf5;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(15, 42, 92, 0.04);
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  background: #f7f9fc;
  color: #425a7c;
  text-align: left;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 1rem 1.1rem;
  border-bottom: 1px solid #edf1f6;
}

tbody td {
  padding: 1rem 1.1rem;
  border-bottom: 1px solid #edf1f6;
  color: #18325d;
  font-size: 0.96rem;
}

tbody tr:hover {
  background: #f9fbff;
}

.contract-id {
  font-weight: 700;
  color: #0d2f70;
}

.customer-name,
.equipment-name {
  font-weight: 600;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.38rem 0.7rem;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.status-badge.active {
  background: #e7f9ef;
  color: #1f7a53;
}

.status-badge.due {
  background: #fff3d7;
  color: #9a6700;
}

.status-badge.overdue {
  background: #fde8e8;
  color: #b42318;
}

.status-badge.draft {
  background: #eef2f8;
  color: #42567a;
}

.table-action {
  background: transparent;
  border: 1px solid #d9e4f4;
  color: #143a79;
  border-radius: 8px;
  padding: 0.44rem 0.72rem;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .toolbar {
    align-items: stretch;
  }

  .search-box input {
    width: 100%;
  }

  .table-card {
    overflow-x: auto;
  }
}
</style>
