pragma solidity >=0.7.4 <0.9.0;

contract Token {

    // Variable
    uint public totalSupply = 10000 * 10 ** 18;
    string public name = "Canvas Token";
    string public symbol = "CVS";
    uint public decimals = 18;

    // Mapping
    mapping(address => uint) public balances;
    mapping(address => mapping(address => uint)) public allowance;

    // Events
    event Transfer(address indexed from, address indexed to, uint amount);
    event Approval(address indexed owner, address indexed spender, uint amount);

    constructor() {
        balances[msg.sender] = totalSupply;
    }
    // Functions
    function balanceOf(address owner) public view returns(uint) {
        return balances[owner];
    }

    function transfer(address _to, uint amount) public returns(bool) {
        require(balanceOf(msg.sender) >= amount, "Balance too low");
        balances[_to] += amount;
        balances[msg.sender] -= amount;
        emit Transfer(msg.sender, _to, amount);
        return true;
    }

    function transferFrom(address from, address to, uint amount) public returns(bool) {
        require(balanceOf(from) >= amount, "balance too low");
        require(allowance[from][msg.sender] >= amount, "balance too low");
        balances[to] += amount;
        balances[from] -= amount;
        emit Transfer(from , to, amount);
        return true;
    }

    function approve(address spender, uint amount) public returns(bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
}