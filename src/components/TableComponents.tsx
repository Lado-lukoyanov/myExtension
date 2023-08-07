import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Convertor } from './Convertor';
import { RatesTable } from './RatesTable';
import '../styles/App.css'
import 'react-tabs/style/react-tabs.css';



export const TableComponents = (): JSX.Element => {
    return <div >
        <Tabs className='myContainer'>
            <TabList>
                <Tab>Конвертор</Tab>
                <Tab>Таблица</Tab>
            </TabList>
            <TabPanel>
                <Convertor />
            </TabPanel>
            <TabPanel>
                <RatesTable />
            </TabPanel>

        </Tabs>
    </div>
}