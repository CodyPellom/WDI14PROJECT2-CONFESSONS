var submissionSchema = mongoose.Schema({
    name: number,
    submit: String
    
 });
 var Submission = mongoose.model("Submission", submissionSchema);