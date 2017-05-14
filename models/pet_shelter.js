var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var petShelterSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name must be present'],
  },

  breed: {
    type: String,
    enum: {
      values: ['Beagle', 'Terrier', 'Poodle', 'Weiner', 'Chihuahua', 'Siamese'],
      message: 'Not a valid breed'
    },
    default: 'Beagle',
  },

  type: {
    type: String,
    enum: {
      values: ['Dog', 'Cat'],
      message: 'Not a valid type'
    },
    default: ['Dog'],
  },

  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: Array,
      default: [-1, -1]
    }
  }

});

petShelterSchema.index({ "loc": "2dsphere" });

petShelterSchema.path('name').validate(function(value, done) {
    this.model('PetShelter').count({ name: value }, function(err, count) {
        if (err) {
            return done(err);
        }
        done(!count);
    });
}, 'Pet name already exists');

var PetShelter = mongoose.model('PetShelter', petShelterSchema);

module.exports = PetShelter;
