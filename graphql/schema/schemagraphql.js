const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    block(BlockSize: Int, BlockHeight: Int): Block
    transactions(BlockID: String, AccountPublicKey: String): [Transactions!]
    accountBalances: [AccountBalance!]
    accountBalance(PublicKey: String): AccountBalance!
    peers: [Peers!]
    mapPeers: [MapPeers!]
  }

  type Block {
    Blocks: [Blocks!]
    BlockSize: Int
    BlockHeight: Int
  }

  type Blocks {
    ID: ID!
    Hash: String
    Height: Int
    Timestamp: String
    Generator: String
    TotalAmountNQT: Int
    TotalFeeNQT: Int
    Transactions: [Transactions]
  }

  type Transactions {
    ID: ID!
    BlockID: String
    Deadline: Int
    SenderPublicKey: String
    RecipientPublicKey: String
    AmountNQT: String
    FeeNQT: String
    EcBlockHeight: Int
    EcBlockID: String
    Version: String
    Timestamp: String
    Signature: String
    Type: String
    Height: Int
    Hash: String
  }

  type AccountBalance {
    ID: ID!
    PublicKey: String
    Balance: String
    UnconfirmedBalance: String
    ForgedBalance: Int
    Height: Int
  }

  type Peers {
    Address: String
    AnnouncedAddress: String
    Port: String
    State: String
    Version: String
  }

  type MapPeers {
    Address: String
    Lat: Float
    Long: Float
    Region: String
    City: String
    AnnouncedAddress: String
    Port: String
    State: String
    Version: String
  }
`;