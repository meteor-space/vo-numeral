/**
 * Quantity: A ValueObject that represents an a positive integer value.
 * EJSON compatible, can be transparently used in Meteor.methods and MongoDB.
 */
Quantity = Space.domain.ValueObject.extend('Quantity', {

  // Create with either `new Quantity(1)` or `new Quantity({ value: 1 })`
  Constructor(data) {
    let value = (data && data.value !== undefined) ? data.value : data;
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
  fields() {
    return {
      value: Match.Integer
    };
  },

  toString() {
    return "" + this.value;
  },

  isMore(other) {
    return this.value > this._getCleanValue(other);
  },

  isLess(other) {
    return this.value < this._getCleanValue(other);
  },

  add(other) {
    let toAdd = other;
    if (!(toAdd instanceof Quantity)) {
      toAdd = new Quantity(other);
    }
    return new Quantity(this.value + toAdd.value);
  },

  substract(other) {
    let toSubstract = other;
    if (!(toSubstract instanceof Quantity)) {
      toSubstract = new Quantity(other);
    }
    return new Quantity(this.value - toSubstract.value);
  },

  delta(other) {
    return this.value - this._getCleanValue(other);
  },

  _getCleanValue(other) {
    return (other instanceof Quantity) ? other.value : other;
  }

});

Quantity.type('Quantity');

Quantity.ERRORS = {
  invalidType: 'Quantity must be an integer.',
  invalidRange: 'Quantity must be bigger than 0.'
};
