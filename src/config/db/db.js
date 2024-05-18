import mongoose from 'mongoose'
export const conn = mongoose.createConnection('mongodb+srv://kalaiselvantcz:kalaiselvancrm@cluster0.snoes0m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', (err, db) => {
  if (err) {
    console.log(err)
  }
  console.log('Master Data Dictionary Database Connected successfully')
})
