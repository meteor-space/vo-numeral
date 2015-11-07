/**
 * Quantity: A ValueObject that represents an a positive integer value.
 * EJSON compatible, can be transparently used in Meteor.methods and MongoDB.
 */
Quantity = Space.domain.ValueObject.extend('Quantity', {

  // Create with either `new Quantity(1)` or `new Quantity({ value: 1 })`
  Constructor: function(data) {

    var value = (data && data.value) ? data.value : data;

    if(value < 0) {
      throw new Error(Quantity.ERRORS.invalidRange);
    }

    Space.messaging.Serializable.call(this, { value: value });
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
    otherValue = (other instanceof Quantity) ? other.value : other;
    return this.value > otherValue;
  },

  isLess: function(other) {
    otherValue = (other instanceof Quantity) ? other.value : other;
    return this.value < otherValue;
  },

  add: function(other) {
    if(!(other instanceof Quantity)) {
      other = new Quantity(other);
    }
    return new Quantity(this.value + other.value);
  }

});

// Register EJSON type
Quantity.type('Quantity');

Quantity.ERRORS = {
  invalidType: 'Quantity must be an integer.',
  invalidRange: 'Quantity must be bigger than 0.'
};
