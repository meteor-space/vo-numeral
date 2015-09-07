/**
 * Quantity: A ValueObject that represents an a positive integer value.
 * EJSON compatible, can be transparently used in Meteor.methods and MongoDB.
 */
Quantity = Space.messaging.Serializable.extend('Quantity', {

  // Create with either `new Quantity(1)` or `new Quantity({ value: 1 })`
  Constructor: function(data) {

    var value = (data && data.value) ? data.value : data;

    if(value < 0) {
      throw new Error(Quantity.ERRORS.invalidRange);
    }

    Space.messaging.Serializable.call(this, { value: value });
    Object.freeze(this);
  },

  toString: function() {
    return "" + this.value;
  },

  equals: function(other) {
    return (other instanceof Quantity) && other.value === this.value;
  }

});

// Register EJSON type
Quantity.type('Quantity');

// Defines the EJSON fields that are automatically serialized
Quantity.fields = {
  value: Match.Integer
};

Quantity.ERRORS = {
  invalidType: 'Quantity must be an integer.',
  invalidRange: 'Quantity must be bigger than 0.'
};
