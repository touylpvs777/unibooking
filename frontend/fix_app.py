import sys

file_path = r'F:\DK\DK-Services-main 13-07-202\DK-Services-main\frontend\src\App.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# insert import
import_str = "const PortalPage = lazy(() => import('@/pages/Portal/PortalPage'))\n"
if 'PortalPage' not in content:
    content = content.replace("const DashboardPage = lazy(() => import('@/pages/Dashboard/DashboardPage'))", import_str + "const DashboardPage = lazy(() => import('@/pages/Dashboard/DashboardPage'))")

# insert route
route_str = '          <Route element={<PrivateRoute />}>\n            <Route path="/portal" element={<Suspense fallback={<PageLoader />}><PortalPage /></Suspense>} />\n'
content = content.replace('          <Route element={<PrivateRoute />}>\n', route_str)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
