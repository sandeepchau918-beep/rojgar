const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  shortInformation: { type: String, required: true, trim: true },
  category: { 
    type: String, 
    enum: ['Latest Job', 'Admit Card', 'Result', 'Answer Key', 'Syllabus', 'Admission', 'Link'], 
    required: true 
  },
  
  importantDates: {
    applicationBegin: { type: String, default: '' },
    lastDateForApply: { type: String, default: '' },
    payExamFeeLastDate: { type: String, default: '' },
    examDate: { type: String, default: '' },
    admitCardAvailable: { type: String, default: '' }
  },

  applicationFee: {
    generalOBC_EWS: { type: String, default: '0' },
    scST: { type: String, default: '0' },
    ph: { type: String, default: '0' },
    paymentModeText: { type: String, default: '' }
  },

  ageLimit: {
    minimumAge: { type: String, default: '' },
    maximumAge: { type: String, default: '' },
    ageAsOn: { type: String, default: '' },
    extraAgeRelaxationDetails: { type: String, default: '' }
  },

  vacancyDetails: [{
    postName: { type: String, default: '' },
    totalPosts: { type: String, default: '' },
    eligibilityCriteria: { type: String, default: '' }
  }],

  importantLinks: [{
    linkTitle: { type: String, default: '' },
    url: { type: String, default: '' }
  }],

  faqs: [
  {
    question: { type: String },
    answer: { type: String }
  }
],
fullContent: { 
  type: String, 
  default: '' 
},


  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// AUTO UPDATE updatedAt (Without 'next' error)
postSchema.pre('save', function () {
  this.updatedAt = Date.now();
});



module.exports = mongoose.model('Post', postSchema);