import React, {Component, useEffect, useState} from 'react'
import Navbar from './Navbar'
import Web3 from "web3";
import DaiToken from "../contracts/DaiToken.json";
import DappToken from "../contracts/DappToken.json";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
            daiToken: {},
            dappToken: {},
            tokenFarm: {},
            daiTokenBalance: '0',
            dappTokenBalance: '0',
            stakingBalance: '0',
            loading: true
        }
    }

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }
    // const [account, setAccount] = useState();
    // const [daiToken, setDaiToken] = useState({});
    // const [dappToken, setDappToken] = useState({});
    // const [tokenFarm, setTokenFarm] = useState({});
    // const [daiTokenBalance, setDaiTokenBalance] = useState('0');
    // const [dappTokenBalance, setDappTokenBalance] = useState('0');
    // const [stakingBalance, setStakingBalance] = useState('0');
    // const [loading, setLoading] = useState(true);
    //
    // useEffect(() => {
    //     const load = async () => {
    //         await loadWeb3()
    //         await loadBlockchainData()
    //
    //     }
    //
    //     load();
    //
    // }, []);

    async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.setState({account: accounts[0]})
        console.log(this.state.account)

        const networkId = await web3.eth.net.getId()

        const daiTokenData = DaiToken.networks[networkId]
        if (daiTokenData) {
            const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
            this.setState({daiToken: daiToken})
            console.log(this.state.daiToken)
            console.log(daiTokenData.address)
            let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
            let bala = await web3.eth.getBalance(this.state.account)
            this.setState({daiTokenBalance: daiTokenBalance.toString()})
            console.log(daiToken)
            console.log(daiTokenData)
            console.log(daiTokenBalance)
            console.log(bala)
        } else {
            alert('Dai token conctract not deployed to detected network')
        }

        const dappTokenData = DappToken.networks[networkId]
        if (dappTokenData) {
            const dappToken = new web3.eth.Contract(DappToken.abi, dappTokenData.address)
            this.setState({dappToken: dappToken})
            console.log(this.state.dappToken)
            console.log(dappTokenData.address)
            let dappTokenBalance = await dappToken.methods.balanceOf(this.state.account).call()
            let bala2 = await web3.eth.getBalance(this.state.account)
            this.setState({dappTokenBalance: dappTokenBalance.toString()})
            console.log(dappToken)
            console.log(dappTokenData)
            console.log(dappTokenBalance)
            console.log(bala2)
        } else {
            alert('Dai token conctract not deployed to detected network')
        }


    }

    const
    loadWeb3 = async () => {
        if (window.etherium) {
            window.web3 = new Web3(window.etherium)
            await window.etherium.enable()
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        } else {
            window.alert('Non eth browser detected. Use metamask')
        }
    }

    render() {
        return (
            <div>
                <Navbar account={this.state.account}/>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <main role="main"
                              className="col-lg-12 ml-auto mr-auto"
                              style={{maxWidth: '600px'}}>
                            <div className="content mr-auto ml-auto">
                                <a
                                    href="http://www.dappuniversity.com/bootcamp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                </a>

                                <h1>Hello, World!</h1>
                                {this.state.account}<br/>
                                {this.state.daiTokenBalance}

                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
