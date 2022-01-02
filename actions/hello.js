// Function is later referenced with this name
const helloWorldFn = async (context, event) => {
    // Log so we can later see what's available in payload
    console.log(event);
    console.log(event.logs[0].topics);

    // let abi = [
    //     "event Increment(address indexed _from, uint256 oldCount, uint256 newCount)"
    // ];
    
    // let iface = new ethers.utils.Interface(abi)
    
    // console.log(web3.eth.abi.decodeParameters(['uint256', 'uint256'], event.logs[0].data))

    // event.logs.forEach((log) => {
    //     console.log(iface.parseLog(log));
    // });

    // Project secrets are accessed through context.
    // Secret must be created through dashboard before accessing it!
    // const apiToken = await context.secrets.get('API_TOKEN')

    // Project storage is accessed through context
    // Fetch already saved transactions under HELLO_WORLD/TXS key
    const storedTxs = await context.storage.getJson('HELLO_WORLD/TXS');
    if (!storedTxs['txs']) {
        // Create new list if first
        storedTxs['txs'] = [event.hash];
    } else {
        // Otherwise append
        storedTxs['txs'].push(event.hash);
    }
    // Write to storage - don't forget the await!
    await context.storage.putJson('HELLO_WORLD/TXS', storedTxs);
};

// Function must be exported
module.exports = { helloWorldFn };
