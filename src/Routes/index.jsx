import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../Components/Home.jsx'
import SelectPage from '../Components/New-existing.jsx'
import  NewSheet  from '../Components/NewSheet.jsx'
import  ExistingSheet  from '../Components/ExistingSheet.jsx'
import GenerateReport from '../Components/GenerateReport.jsx'
import ExpensesCard from '../Components/ExpensesCard'

const Routes = () =>    (
    <BrowserRouter>
        <Switch>
            <Route path = "/" exact component = {Home} />
            <Route path = '/1' exact component = {SelectPage} />
            <Route path = '/' exact component = {Home} />
            <Route path = '/2' exact component = {NewSheet} />
            <Route path = '/3' exact component = {ExistingSheet} />
            <Route path = '/generate-report' exact component = {GenerateReport} />
            <Route path = '/expenses-card' exact component = {ExpensesCard} />
        </Switch>
    </BrowserRouter>
)

export default Routes