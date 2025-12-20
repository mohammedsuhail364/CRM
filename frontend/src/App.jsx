import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Features from './Pages/Features'
import Pricing from './Pages/Pricing'
import Contact from './Pages/Contact'
import Home from './Components/Home'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Callregister from './Pages/Callregister'
import ScrollToTop from './Components/ScrollToTop'
import Tickets from './Pages/Tickets'
import CreateCustomer from './Pages/CreateCustomer'
import AdminDashboard from './Pages/AdminDashboard'
import EmployeesPage from './Pages/EmployeesPage'
import TicketsPage from './Pages/TicketsPage'
import EmployeeCustomerDetails from './Pages/EmployeeCustomerDetails'
import OpenAndCloseTicketsPage from './Pages/OpenAndCloseTicketsPage'
import CreateEmployee from './Pages/CreateEmployee'
import Signup from './Pages/Signup'
// import RepeatedCustomer from './Pages/RepeatedCustomer'

const App = () => {
  return (
    <div className="font-bold">
      <Navbar/>
      <ScrollToTop/>
      <Routes>
        <Route path="/features" element={<Features/>} />
        <Route path='/pricing' element={<Pricing/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/login/*" element={<Login/>}/>
        <Route path="/signup/*" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path='/callregister' element={<Callregister/>}/>
        <Route path="/create-customers" element={<CreateCustomer/>}/>
        <Route path='/tickets' element={<Tickets/>}/>
        {/* admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/employees" element={<EmployeesPage />} />
        <Route path="/admin/tickets" element={<TicketsPage />} />
        {/* <Route path="/admin/repeated-customer" element={<RepeatedCustomer />} /> */}
        <Route path="/admin/tickets/get" element={<OpenAndCloseTicketsPage />} />
        <Route path="/admin/employees/:id/customers" element={<EmployeeCustomerDetails />} />
        <Route path="/admin/create-employee" element={<CreateEmployee />} />
      </Routes>
    </div>
  )
}

export default App