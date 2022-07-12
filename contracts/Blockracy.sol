// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

/**
 * @dev Main Blockracy contract
 * currently contains all logic and token issuance
 */

contract Blockracy {
    /**
     * @dev Data structure for Proposal records
     * gets updated as votes come in
     */
    struct Proposal {
        uint proposalId;
        address proposer;
        string title;
        string description;
        uint startTime;
        uint endTime;
        uint yesVotes;
        uint noVotes;
    }

    /**
     * @dev Array of all Proposals
     * proposalId is same as array index
     */
    Proposal[] public proposals;

    /**
     * @dev Tracks who already voted for which proposals
     * voterAddress => proposalId => alreadyVoted
     */
    mapping(address => mapping(uint => bool)) public voted;

    /**
     * @dev Event emitted when proposal created
     */
    event ProposalCreated(
        uint proposalId,
        address proposer,
        string title,
        uint startTime,
        uint endTime
    );

    /**
     * @dev Event emitted when vote placed
     */
    event VotePlaced(uint proposalId, address voter, bool voteAnswer);

    /**
     * @dev Creates a new proposal
     *
     * Emits a {ProposalCreated} event with Proposal details
     *
     * Requirements:

     * - proposal's `startTime` must be in the future
     * - proposal's `endTime` must be after its `startTime`
     */
    function submitProposal(
        string memory title,
        string memory description,
        uint startTime,
        uint endTime
    ) public returns (uint proposalId) {
        require(
            startTime >= block.timestamp,
            "Start time must be in the future"
        );
        require(endTime >= startTime, "End time must be after start time");

        proposalId = proposals.length;
        proposals.push(
            Proposal({
                proposalId: proposalId,
                proposer: msg.sender,
                title: title,
                description: description,
                startTime: startTime,
                endTime: endTime,
                yesVotes: 0,
                noVotes: 0
            })
        );

        emit ProposalCreated(proposalId, msg.sender, title, startTime, endTime);
    }

    /**
     * @dev Casts a vote on a proposal
     *
     * Emits a {VotePlaced} event with voting details
     *
     * Requirements:

     * - proposal's `startTime` must have already passed
     * - proposal's `endTime` must not yet be reached
     * - voter address must not have `voted` on this proposal
     */
    function vote(uint proposalId, bool voteAnswer) public {
        require(
            block.timestamp < proposals[proposalId].endTime,
            "Voting has ended for this proposal"
        );
        require(
            block.timestamp > proposals[proposalId].startTime,
            "Voting has not yet started for this proposal"
        );
        require(
            !voted[msg.sender][proposalId],
            "Voter has already voted for this proposal"
        );

        voted[msg.sender][proposalId] = true;
        if (voteAnswer) {
            proposals[proposalId].yesVotes++;
        } else {
            proposals[proposalId].noVotes++;
        }

        emit VotePlaced(proposalId, msg.sender, voteAnswer);
    }
}
