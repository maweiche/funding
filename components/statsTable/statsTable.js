import styled from "styled-components"
import { 
    getLatestBlockHeight, 
    getChangesInTokenHolders,
    getTokenTransfers
} from "../../pages/api/covalent"
import { useEffect, useState } from "react"
import { getContractAddress } from "ethers/lib/utils"

const StatsTable = () => {
    const [latestBlockHeight, setLatestBlockHeight] = useState(0)
    const [previousBlockHeight, setPreviousBlockHeight] = useState(0) //based on 24 hour average
    const [changesInTokenHolders, setChangesInTokenHolders] = useState(0)
    const [tokenTransfers, setTokenTransfers] = useState(0)

    useEffect(() => {
        // getLatestBlockHeight of chainId 1 (mainnet)
        const getData = async () => {
            const latestBlockHeight = await getLatestBlockHeight(1)
            console.log('latest blockheight',latestBlockHeight)
            setLatestBlockHeight(latestBlockHeight)
            setPreviousBlockHeight(latestBlockHeight - 7155) // 24 hours average
        }
        getData();
        // getChangesInTokenHolders().then((res) => {
        //     setChangesInTokenHolders(res.data.data.items[0].changes)
        // })
        // getTokenTransfers().then((res) => {
        //     setTokenTransfers(res.data.data.items[0].transfers)
        // })
    }, [])

    return (
        <div>
            <div>
                <div>Latest Block Height</div>
                <div>{latestBlockHeight}</div>
                <div>24 hr. prior Block Height</div>
                <div>{previousBlockHeight}</div>
            </div>
        </div>
    )
}

export default StatsTable

const Container = styled.div`
  padding-bottom: 2%;
  padding-top: 2%;
`

const I = styled.input`
  padding: 1%;
  padding-left: 2%;
`

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border: 1px solid black;
    text-align: center;
`
const Header = styled.th`
    border: 1px solid black;
    padding: 1%;
    background-color: transparent;
`
const Row = styled.tr`
    border: 1px solid black;
    padding: 1%;
`
const Cell = styled.td`
    border: 1px solid black;
    padding: 1%;
`

// create a dummy data set of 3 different projects with a value for 24hrTxns, Microfunds, and a Deadline
const hottestProjectsData = [
    {
        name: "Project 1",
        values: {
            "24hrTxns": 100,
            "Microfunds": 100,
            "Deadline": "2020-01-01"
        }
    },
    {
        name: "Project 2",
        values: {
            "24hrTxns": 200,
            "Microfunds": 200,
            "Deadline": "2020-01-02"
        }
    },
    {
        name: "Project 3",
        values: {
            "24hrTxns": 300,
            "Microfunds": 300,
            "Deadline": "2020-01-03"
        }
    }
]

const TopChainReactionsData = [
    {
        transaction: "txn1",
        values: {
            "donation": 100,
            "impact": 100,
            "multiplier": 100,
            "date": "2020-01-01"
        }
    },
    {
        transaction: "txn2",
        values: {
            "donation": 200,
            "impact": 200,
            "multiplier": 200,
            "date": "2020-01-02"
        }
    },
    {
        transaction: "txn3",
        values: {
            "donation": 300,
            "impact": 300,
            "multiplier": 300,
            "date": "2020-01-03"
        }
    }
]

export const HottestProjects = () => {

    return (
        <Container>
            <Table>
                <thead>
                    <Row>
                        <Header>Project Info</Header>
                        <Header>Transactions 24h</Header>
                        <Header>Microfunds</Header>
                        <Header>Deadline</Header>
                    </Row>
                </thead>
                <tbody>
                    {hottestProjectsData.map((project, index) => {
                        return (
                            <Row key={index}>
                                <Cell>{project.name}</Cell>
                                <Cell>{project.values["24hrTxns"]}</Cell>
                                <Cell>{project.values["Microfunds"]}</Cell>
                                <Cell>{project.values["Deadline"]}</Cell>
                            </Row>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    )
}

export const TopChainReactions = () => {

    return (
        <Container>
            <Table>
                <thead>
                    <Row>
                        <Header>Transaction</Header>
                        <Header>Donation</Header>
                        <Header>Impact</Header>
                        <Header>Multiplier</Header>
                        <Header>Date</Header>
                    </Row>
                </thead>
                <tbody>
                    {TopChainReactionsData.map((transaction, index) => {
                        return (
                            <Row key={index}>
                                <Cell>{transaction.transaction}</Cell>
                                <Cell>{transaction.values["donation"]}</Cell>
                                <Cell>{transaction.values["impact"]}</Cell>
                                <Cell>{transaction.values["multiplier"]}</Cell>
                                <Cell>{transaction.values["date"]}</Cell>
                            </Row>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    )
}


// Path: components/statsTable/statsTable.js
