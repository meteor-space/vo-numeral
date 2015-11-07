describe("Quantity", function() {

  beforeEach(function() {
    this.quantity = new Quantity(9);
  });

  it('is serializable', function() {
    var copy = EJSON.parse(EJSON.stringify(this.quantity));
    expect(copy.equals(this.quantity)).to.be.true;
  });

  // =============== CONSTRUCTION ================ //

  describe('construction', function() {

    it('takes a positive integer bigger than 0', function() {
      expect(new Quantity(1).value).to.equal(1);
      expect(new Quantity(20).value).to.equal(20);
      expect(new Quantity(9999).value).to.equal(9999);
    });

    it('does not allow values outside the boundaries', function() {

      expect(function() {
        new Quantity(-1);
      }).to.throw(Quantity.INVALID_RANGE_ERROR);

    });

    it('only takes integer values', function() {

      expect(function() {
        new Quantity(20.50);
      }).to.throw(Quantity.INVALID_TYPE_ERROR);

      expect(function() {
        new Quantity("5");
      }).to.throw(Quantity.INVALID_TYPE_ERROR);

    });
  });

  // =============== EQUALITY ================ //

  describe('equality', function() {

    it('returns true for same values', function() {
      expect(new Quantity(1).equals(new Quantity(1))).to.be.true;
    });

    it('returns false for different values', function() {
      expect(new Quantity(2).equals(new Quantity(6))).to.be.false;
    });

  });

  // =============== IMMUTABILITY ================ //

  describe('immutability', function() {

    it('freezes itself', function() {
      expect(Object.isFrozen(this.quantity)).to.be.true;
    });

  });
});
