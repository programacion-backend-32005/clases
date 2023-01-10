import studentModel from './models/student.js'
import courseModel from './models/courses.js'
import mongoose from 'mongoose'

const env = async () => {
   await mongoose.connect('mongodb+srv://el_profe:QndJxyOrQJyfjWnZ@cluster0.timeekf.mongodb.net/?retryWrites=true&w=majority', {
      dbName: 'myFirstDatabase'
   })
   console.log('DB connected!');

   // const student = await studentModel.findOne({_id: "63bcb1f60cc6f0c9e8644d3a"})

   // student.courses.push({course: "63bcb38e09c218e3f7d4bc28"})
   // const result = await studentModel.updateOne({_id: "63bcb1f60cc6f0c9e8644d3a"}, student)
   // console.log(result);

   //const student = await studentModel.findOne({_id: "63bcb1f60cc6f0c9e8644d3a"}).populate('courses.course')

   // Despues del middleware pre
   const student = await studentModel.find({_id: "63bcb1f60cc6f0c9e8644d3a"})
   console.log(JSON.stringify(student, null, '\t'));

   process.exit()
}

env()