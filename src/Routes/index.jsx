import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../Components/Home.jsx'
import SelectPage from '../Components/New-existing.jsx'
import  NewSheet  from '../Components/NewSheet.jsx'
import  ExistingSheet  from '../Components/ExistingSheet.jsx'
import GenerateReport from '../Components/GenerateReport.jsx'
import ExpensesCard from '../Components/ExpensesCard.jsx'
import Contact from '../Components/Contact.jsx'

const Routes = () =>    (
    <BrowserRouter>
        <Switch>
            <Route path = "/" exact component = {Home} />
            <Route path = '/select-page' exact component = {SelectPage} />
            <Route path = '/' exact component = {Home} />
            <Route path = '/new-sheet' exact component = {NewSheet} />
            <Route path = '/existing-sheet' exact component = {ExistingSheet} />
            <Route path = '/generate-report' exact component = {GenerateReport} />
            <Route path = '/expenses-card' exact component = {ExpensesCard} />
            <Route path = '/contact' exact component = {Contact} />
        </Switch>
    </BrowserRouter>
)

export default Routes