/**
 * Quantity: A ValueObject that represents an a positive integer value.
 * EJSON compatible, can be transparently used in Meteor.methods and MongoDB.
 */
Quantity = Space.domain.ValueObject.extend('Quantity', {

  // Create with either `new Quantity(1)` or `new Quantity({ value: 1 })`
  Constructor: function(data) {
    let value = (data && data.value) ? data.value : data;
    try {
      Quantity.__super__.constructor.call(this, { value });
    } catch (e) {
      throw new Error(Quantity.ERRORS.invalidType);
    }
    if (value < 0) {
      throw new Error(Quantity.ERRORS.invalidRange);
    }
    Object.freeze(this);
  },

  // Defines the EJSON fields that are automatically serialized
  fields: function() {
    return {
      value: Match.Integer
    };
  },

  toString: function() {
    return "" + this.value;
  },

  isMore: function(other) {
    return this.value > this._getCleanValue(other);
  },

  isLess: function(other) {
    return this.value < this._getCleanValue(other);
  },

  add: function(other) {
    let toAdd = other;
    if (!(toAdd instanceof Quantity)) {
      toAdd = new Quantity(other);
    }
    return new Quantity(this.value + toAdd.value);
  },

  substract: function(other) {
    let toSubstract = other;
    if (!(toSubstract instanceof Quantity)) {
      toSubstract = new Quantity(other);
    }
    return new Quantity(this.value - toSubstract.value);
  },

  delta: function(other) {
    return this.value - this._getCleanValue(other);
  },

  _getCleanValue: function(other) {
    return (other instanceof Quantity) ? other.value : other;
  }

});

// Register EJSON type
Quantity.type('Quantity');

Quantity.ERRORS = {
  invalidType: 'Quantity must be an integer.',
  invalidRange: 'Quantity must be bigger than 0.'
};
