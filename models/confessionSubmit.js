var confessionSubmitSchema = mongoose.Schema({
    name: number,
    submission: String
    
 });
 var ConfessionSubmit = mongoose.model("ConfessionSubmit", confessionSubmitSchema);