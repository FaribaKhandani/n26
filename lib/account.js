'use strict';
const Promise = require('bluebird');

const api = require('./api');
const utils = require('./utils');

/**
 * @typedef Promise
 *
 * Bluebird promise
 * See http://bluebirdjs.com/docs/api-reference.html for references
 */

/**
 * @typedef  account
 *
 * @property {String} id
 * @property {String} iban             Account IBAN
 * @property {String} status           Status of the account
 * @property {number} usableBalance    Usable balance
 * @property {number} availableBalance Available balance
 * @property {number} bankBalance      Bank balance
 */

/**
 * @typedef  addresses
 *
 * @property {objet}    paging
 * @property {number}   paging.totalResults    Total amount of addresses
 * @property {Object[]} data
 * @property {String}   data.id
 * @property {String}   data.type              Type address
 * @property {String}   data.addressLine1      Address line 1
 * @property {String}   data.streetName        Street name
 * @property {String}   data.houseNumberBlock  Street Number
 * @property {String}   data.zipCode           Zip code
 * @property {String}   data.cityName          City
 * @property {String}   data.countryName       Country
 */

/**
 * @typedef  cards
 *
 * @property {objet}    paging
 * @property {number}   paging.totalResults     Total amount of addresses
 * @property {Object[]} data
 * @property {String}   data.id
 * @property {String}   data.cardType           Card type
 * @property {String}   data.n26Status          Card status
 * @property {String}   data.maskedPan          Number card (masked)
 * @property {String}   data.expirationDate     Expiration date
 * @property {String}   data.pinDefined
 * @property {String}   data.cardActivated
 * @property {String}   data.usernameOnCard     Name on the card
 */

/**
 * @typedef  me
 *
 * @property {String} id
 * @property {String} birthDate         Birth date
 * @property {String} birthPlace        Birth place
 * @property {String} email             Email
 * @property {String} gender            Gender
 * @property {String} title             Title (eg: Ph.)
 * @property {String} firstName         Firstname
 * @property {String} lastName          Lastname
 * @property {String} kycFirstName      Firstname on KYC
 * @property {String} kycLastName       Lastname on KYC
 * @property {String} mobilePhoneNumber Mobile phone number
 * @property {String} nationality       Nationality
 * @property {String} passwordHash
 * @property {String} shadowID
 * @property {String} signupCompleted
 * @property {String} taxIDRequired
 */

/**
 * @typedef  recipients
 *
 * @property {String} iban
 * @property {String} name
 * @property {String} bic
 */

/**
 * @typedef statuses
 *
 * @property {Number}        singleStepSignup
 * @property {Number}        emailValidationInitiated
 * @property {Number}        emailValidationCompleted
 * @property {Number}        phonePairingInitiated
 * @property {Number}        phonePairingCompleted
 * @property {Number}        kycInitiated
 * @property {Number}        kycCompleted
 * @property {Number}        kycWebIDInitiated
 * @property {Number}        kycWebIDCompleted
 * @property {Number}        cardActivationCompleted
 * @property {Number}        cardIssued
 * @property {Number}        pinDefinitionCompleted
 * @property {Number}        bankAccountCreationInitiated
 * @property {Number}        bankAccountCreationSucceded
 * @property {Number}        firstIncomingTransaction
 * @property {String}        smsVerificationCode
 * @property {Number}        unpairTokenCreation
 * @property {Number|String} finoIntegrationStatus='NEVER'
 * @property {Number}        id
 */

/**
 * @typedef  transactions
 *
 * @property {String} id
 * @property {String} type
 * @property {String} smartLinkId
 * @property {String} amount
 * @property {String} currencyCode
 * @property {String} originalAmount
 * @property {String} originalCurrency
 * @property {String} exchangeRate
 * @property {String} merchantCity
 * @property {String} visibleTS
 * @property {String} mcc
 * @property {String} mccGroup
 * @property {String} merchantName
 * @property {String} merchantId
 * @property {String} recurring
 * @property {String} userId
 * @property {String} linkId
 * @property {String} accountId
 * @property {String} category
 * @property {String} cardId
 * @property {String} pending
 * @property {String} transactionNature
 * @property {String} partnerAccountIsSepa
 * @property {String} partnerName
 * @property {String} partnerIban
 * @property {String} referenceText
 * @property {String} userCertified
 * @property {String} smartContactId
 * @property {String} partnerBic
 * @property {String} confirmed
 */

/**
 * @typedef  transaction
 *
 * @property {String}   id
 * @property {String}   type
 * @property {String}   smartLinkId
 * @property {String}   amount
 * @property {String}   currencyCode
 * @property {String}   originalAmount
 * @property {String}   originalCurrency
 * @property {String}   exchangeRate
 * @property {String}   merchantCity
 * @property {String}   visibleTS
 * @property {String}   mcc
 * @property {String}   mccGroup
 * @property {String}   merchantName
 * @property {String}   merchantId
 * @property {String}   recurring
 * @property {String}   userId
 * @property {String}   linkId
 * @property {String}   accountId
 * @property {String}   category
 * @property {String}   cardId
 * @property {String}   pending
 * @property {String}   transactionNature
 * @property {String}   partnerAccountIsSepa
 * @property {String}   partnerName
 * @property {String}   partnerIban
 * @property {String}   referenceText
 * @property {String}   userCertified
 * @property {String}   smartContactId
 * @property {String}   partnerBic
 * @property {String}   confirmed
 * @property {String[]} tags
 * @property {Object}   [meta]
 * @property {String}   [meta.memo]
 */

/**
 * @typedef transfer
 *
 * @property {String}  id
 * @property {String}  n26Iban
 * @property {String}  referenceText
 * @property {String}  partnerName
 * @property {String}  partnerIban
 * @property {String}  partnerBic
 * @property {Boolean} partnerAccountIsSepa
 * @property {Number}  amount
 * @property {String}  currencyCode
 * @property {String}  linkId
 * @property {String}  recurring
 * @property {String}  visibleTS
 */

/**
 * @typedef invitation
 *
 * @property {String} invited Invited email
 * @property {String} status  Current status
 * @property {Number} reward  Reward amount
 * @property {Number} created Timestamp
 */

/**
 * @typedef barzahlen
 *
 * @property {String}  depositAllowance
 * @property {String}  withdrawAllowance
 * @property {String}  remainingAmountMonth
 * @property {String}  feeRate
 * @property {String}  cash26WithdrawalsCount
 * @property {String}  cash26WithdrawalsSum
 * @property {String}  atmWithdrawalsCount
 * @property {String}  atmWithdrawalsSum
 * @property {String}  monthlyDepositFeeThreshold
 * @property {Boolean} success
 */

/**
 * @typedef statements
 *
 * @property {String}  id
 * @property {String}  url
 * @property {Number}  month
 * @property {Number}  visibleTS
 * @property {Number}  year
 */

/**
 * Number26 Account
 */
class Account {
  /**
   * Create new account instance
   *
   * @param  {Object} auth Object from auth()
   */
  constructor(email, password) {
    this.logged = false;
    this.email = email;
    this.password = password;
    this.createdAt = null;
    this.accessToken = null;
    this.expiresIn = null;
    this.jti = null;
    this.scope = null;
    this.tokenType = null;
  }

  /**
   * authentication
   *
   * @returns {Promise<Account>}
   */
  auth() {
    return api.auth(this.email, this.password)
      .bind(this)
      .then((auth) => {
        this.logged = true;
        this.createdAt = +new Date() / 1000;
        this.accessToken = auth.access_token;
        this.expiresIn = auth.expires_in;
        this.jti = auth.jti;
        this.scope = auth.scope;
        this.tokenType = auth.token_type;

        return this;
      });
  }

  /**
   * Get account details
   *
   * @returns {Promise<account>}
   */
  account() {
    return utils.callApi(this, 'getAccount');
  }

  /**
   * Get addresses
   *
   * @return {Promise<addresses>}
   */
  addresses() {
    return utils.callApi(this, 'getAddresses');
  }

  /**
   * Check barzahlen
   *
   * @return {Promise<barzahlen>}
   */
  barzahlen() {
    return utils.callApi(this, 'checkBarzahlen');
  }

  /**
   * Get cards
   *
   * @return {Promise<cards>}
   */
  cards() {
    return utils.callApi(this, 'getCards');
  }

  /**
   * Get / send invitations emails
   *
   * @param  {String|String[]}                [emails] Emails to send an invitation
   *
   * @return {Promise|Promise<invitation[]>}
   */
  invitations(emails) {
    if (emails) {
      emails = Array.isArray(emails) ? emails : [emails];
      return Promise.each(emails, (email) => utils.callApi(this, 'sendInvitations', email));
    }

    return utils.callApi(this, 'getInvitations');
  }

  /**
   * Get information about current user
   *
   * @param {Boolean} full Return full informations
   *
   * @return {Promise<me>}
   */
  me(full) {
    return utils.callApi(this, 'getMe', {full: !!full});
  }

  /**
   * Create or update Meme
   *
   * @param {String} smartLinkId SmartLinkId
   * @param {String} memo        Memo text
   */
  memo(smartLinkId, memo) {
    return utils.callApi(this, 'getTransactionMeta', smartLinkId)
      .then((meta) => utils.callApi(this, 'createOrUpdateMemo', {smartLinkId, meta, memo}));
  }

  /**
   * Get statements
   *
   * @return {Promise<statements[]>}
   */
  statements() {
    return utils.callApi(this, 'getStatements');
  }

  /**
   * Get statuses
   *
   * Return many timestamps about this account
   *
   * @return {Promise<statuses>}
   */
  statuses() {
    return utils.callApi(this, 'getStatuses');
  }

  /**
   * Get recipients
   *
   * @return {Promise<recipients[]>}
   */
  recipients() {
    return utils.callApi(this, 'getRecipients');
  }

  /**
   * Get transactions
   *
   * @param  {Object}   [options]
   * @param  {Number}   [options.limit]         Limit results
   * @param  {String[]} [options.categories]    Filter by categories
   * @param  {Number}   [options.from]          "From" timestamp limit
   * @param  {Number}   [options.to]            "To" timestamp limit
   * @param  {String}   [options.text]          Text search
   * @param  {String}   [options.pending=false] Pending transaction
   *
   * @return {Promise<transactions[]>}
   */
  transactions(options) {
    return utils.callApi(this, 'getTransactions', options || {});
  }

  /**
   * Get transaction detail
   *
   * @param  {String}  id            Transaction number
   * @param  {Object}  options
   * @param  {Boolean} options.meta  With meta
   *
   * @return {Promise<transaction>}
   */
  transaction(id, options) {
    if (!id) {
      return Promise.reject('MISSING_PARAMS');
    }

    const data = {id};

    if (options && options.meta) {
      data.meta = options.meta;
    }

    return utils.callApi(this, 'getTransaction', data);
  }

  /**
   * Create transfer
   *
   * @param  {Object}        data
   * @param  {Number|String} data.pin        Credit card pin
   * @param  {String}        data.bic        BIC recipient
   * @param  {String}        data.iban       IBAN recipient
   * @param  {String}        data.name       Recipient name
   * @param  {Number}        data.amount     Amount
   * @param  {String}        data.reference  Reference
   *
   * @return {Promise<transfer>}
   */
  transfer(data) {
    if (!data.pin || !data.iban || !data.bic || !data.amount || !data.name || !data.reference) {
      return Promise.reject('MISSING_PARAMS');
    }

    if (data.reference.length > 135) {
      return Promise.reject('REFERENCE_TOO_LONG');
    }

    return utils.callApi(this, 'createTransfer', data);
  }

  /**
   * Init unpair device
   *
   * Init unpair process. Will receive an email (ignore it) + sms.
   *
   * @param  {Number} pin
   * @param  {Number} cardNumber The 10 digits on the card, below name
   *
   * @return {Promise}
   */
  unpairInit(pin, cardNumber) {
    const that = this;

    if (!pin || !cardNumber) {
      return Promise.reject('MISSING_PARAMS');
    }

    return utils.callApi(that, 'unpairUpstart')
      .then(link => utils.callApi(that, 'unpairVerify', link))
      .then(() => utils.callApi(that, 'unpairValidationPin', pin))
      .then(() => utils.callApi(that, 'unpairValidationCard', cardNumber))
      .then(() => utils.callApi(that, 'unpairValidationSms'));
  }

  /**
   * Confirm unpairing
   *
   * Confirm unpairing
   * Use the number on the sms message.
   *
   * @param  {Number} smsNumber The 5 digits received on the phone
   *
   * @return {Promise}
   */
  unpairConfirm(smsNumber) {
    if (!smsNumber) {
      return Promise.reject('MISSING_PARAMS');
    }

    return utils.callApi(this, 'unpairValidationSmsVerify', smsNumber);
  }
}

module.exports = Account;