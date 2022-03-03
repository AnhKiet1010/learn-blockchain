// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Crud {
    struct Player {
        uint id;
        string name;
    }

    Player[] public players;
    uint public nextId = 1;

    function create(string memory name) public {
        players.push(Player(nextId, name));
        nextId++;
    }

    function read(uint id) public view returns (uint, string memory) {
        uint i = loopId(id);
        return (players[i].id, players[i].name);
    }

    function upload(uint id, string memory name) public {
        uint i = loopId(id);
        players[i].name = name;
    }

    function remove(uint id) public {
        uint i = loopId(id);
        delete players[i];
    }

    function loopId(uint id) internal view returns (uint _id) {
        for (uint i = 0; i < players.length; i++) {
            if (players[i].id == id) {
                return i;
            }
        }

        revert("Player not exist");
    }
}
