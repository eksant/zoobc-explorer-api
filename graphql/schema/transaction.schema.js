const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    transactions(
      page: Int
      limit: Int
      order: String
      BlockID: String
      AccountAddress: String
      refresh: Boolean
    ): Transactions!
    transaction(TransactionID: String!): Transaction!
  }

  extend type Mutation {
    transactions: String!
  }

  extend type Subscription {
    transactions: [Transaction!]!
  }

  type Transactions {
    Transactions: [Transaction!]!
    Paginate: Paginate!
  }

  type Transaction {
    _id: ID!
    TransactionID: String
    Timestamp: Date
    TransactionType: Int
    BlockID: String
    Height: Int
    Sender: String
    SenderFormatted: String
    Recipient: String
    RecipientFormatted: String
    Fee: Float
    Status: String
    FeeConversion: String
    Version: Int
    TransactionHash: String
    TransactionHashFormatted: String
    TransactionBodyLength: Int
    TransactionBodyBytes: String
    TransactionIndex: Int
    Signature: String
    Message: String
    TransactionBody: String
    TransactionTypeName: String
    SendMoney: SendMoney
    NodeRegistration: NodeRegistration
    SetupAccount: SetupAccount
    UpdateNodeRegistration: UpdateNodeRegistration
    RemoveAccount: RemoveAccount
    RemoveNodeRegistration: RemoveNodeRegistration
    ClaimNodeRegistration: ClaimNodeRegistration
    ApprovalEscrow: ApprovalEscrow
    Escrow: Escrow
    EscrowTransaction: Transaction
    MultisigChild: Boolean
    MultiSignature: MultiSignature
    MultiSignatureTransactions: [Transaction!]
    Block: Block!
  }

  type Escrow {
    ID: String
    SenderAddress: String
    RecipientAddress: String
    ApproverAddress: String
    Amount: Float
    AmountConversion: String
    Commission: Float
    CommissionConversion: String
    Timeout: String
    Status: String
    BlockHeight: Int
    Latest: Boolean
    Instruction: String
  }

  type SendMoney {
    Amount: Float
    AmountConversion: String
  }

  type NodeRegistration {
    NodePublicKey: String
    NodePublicKeyFormatted: String
    AccountAddress: String
    NodeAddress: NodeAddress
    LockedBalance: Float
    LockedBalanceConversion: String
    ProofOfOwnership: ProofOfOwnership
  }

  type SetupAccount {
    SetterAccountAddress: String
    RecipientAccountAddress: String
    Property: String
    Value: String
  }

  type UpdateNodeRegistration {
    NodePublicKey: String
    NodePublicKeyFormatted: String
    NodeAddress: NodeAddress
    LockedBalance: Float
    LockedBalanceConversion: String
    ProofOfOwnership: ProofOfOwnership
  }

  type RemoveAccount {
    SetterAccountAddress: String
    RecipientAccountAddress: String
    Property: String
    Value: String
  }

  type RemoveNodeRegistration {
    NodePublicKey: String
    NodePublicKeyFormatted: String
  }

  type ClaimNodeRegistration {
    NodePublicKey: String
    NodePublicKeyFormatted: String
    ProofOfOwnership: ProofOfOwnership
  }

  type ApprovalEscrow {
    TransactionID: String
    Approval: String
  }

  type MultiSignature {
    MultiSignatureInfo: MultiSignatureInfo
    UnsignedTransactionBytes: String
    SignatureInfo: SignatureInfo
  }

  type MultiSignatureInfo {
    MinimumSignatures: Int
    Nonce: String
    Addresses: [String]
    MultisigAddress: String
    BlockHeight: Int
    Latest: Boolean
  }

  type SignatureInfo {
    TransactionHash: String
    TransactionHashFormatted: String
    Signatures: [Signatures]
  }

  type ProofOfOwnership {
    MessageBytes: String
    Signature: String
  }

  type Signatures {
    Address: String
    Signature: String
  }
`
