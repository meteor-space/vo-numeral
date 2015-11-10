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
      }).to.throw(Quantity.ERRORS.invalidRange);

    });

    it('only takes integer values', function() {

      expect(function() {
        new Quantity(20.50);
      }).to.throw(Quantity.ERRORS.invalidType);

      expect(function() {
        new Quantity("5");
      }).to.throw(Quantity.ERRORS.invalidType);

    });
  });

  // =============== COMPARISON ================ //

  describe('comparison', function() {

    describe('equality', function() {

      it('returns true for same values', function() {
        expect(new Quantity(1).equals(new Quantity(1))).to.be.true;
      });

      it('returns false for different values', function() {
        expect(new Quantity(2).equals(new Quantity(6))).to.be.false;
      });

    });

    describe('isMore', function() {

      it('compares two quantities', function() {
        expect(new Quantity(2).isMore(new Quantity(1))).to.be.true;
        expect(new Quantity(1).isMore(new Quantity(2))).to.be.false;
      });

      it('allows comparison with plain numbers', function() {
        expect(new Quantity(2).isMore(1)).to.be.true;
        expect(new Quantity(1).isMore(2)).to.be.false;
      });

    });

    describe('isLess', function() {

      it('compares two quantities', function() {
        expect(new Quantity(1).isLess(new Quantity(2))).to.be.true;
        expect(new Quantity(2).isLess(new Quantity(1))).to.be.false;
      });

      it('allows comparison with plain numbers', function() {
        expect(new Quantity(1).isLess(2)).to.be.true;
        expect(new Quantity(2).isLess(1)).to.be.false;
      });

    });

  });

  // =============== MATH ================ //

  describe('math', function() {

    describe("adding to quantities", function () {

      it("returns a new quantity with the sum of both", function () {
        sum = new Quantity(1).add(new Quantity(2));
        expect(sum).to.be.instanceof(Quantity);
        expect(sum.value).to.equal(3);
      });

      it("also handles adding plain values", function () {
        sum = new Quantity(1).add(2);
        expect(sum).to.be.instanceof(Quantity);
        expect(sum.value).to.equal(3);
      });

      it("throws error if plain number is not a valid quantity", function () {
        function addInvalidQuantity() {
          new Quantity(1).add(-1);
        }
        expect(addInvalidQuantity).to.throw(Quantity.ERRORS.invalidRange);
      });

    });

    describe("substracting from quantities", function () {

      it("returns a new quantity with the difference of both", function () {
        difference = new Quantity(2).substract(new Quantity(1));
        expect(difference).to.be.instanceof(Quantity);
        expect(difference.value).to.equal(1);
      });

      it("also handles substracting plain values", function () {
        difference = new Quantity(2).substract(1);
        expect(difference).to.be.instanceof(Quantity);
        expect(difference.value).to.equal(1);
      });

      it("throws error if plain number is not a valid quantity", function () {
        function addInvalidQuantity() {
          new Quantity(2).substract(-1);
        }
        expect(addInvalidQuantity).to.throw(Quantity.ERRORS.invalidRange);
      });

      it("throws error if resulting number is not a valid quantity", function () {
        function calcInvalidQuantity() {
          new Quantity(1).substract(2);
        }
        expect(calcInvalidQuantity).to.throw(Quantity.ERRORS.invalidRange);
      });

    });

    describe("calculating the delta between quantities", function () {

      it("returns the difference", function () {
        expect(new Quantity(2).delta(new Quantity(1))).to.equal(1);
        expect(new Quantity(1).delta(new Quantity(3))).to.equal(-2);
      });

      it("also handles plain numbers", function () {
        expect(new Quantity(2).delta(1)).to.equal(1);
        expect(new Quantity(1).delta(3)).to.equal(-2);
      });

    });

  });

  // =============== IMMUTABILITY ================ //

  describe('immutability', function() {

    it('freezes itself', function() {
      expect(Object.isFrozen(this.quantity)).to.be.true;
    });

  });
});
