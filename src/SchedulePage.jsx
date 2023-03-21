import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to right, #283c86, #45a247)',
    },
    container: {
      background: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(3),
      boxShadow: theme.shadows[4],
    },
  }));

const studentList = [
  'Achirei Alexandru-Florin',
  'Albu David',
  'Andrei Mihai-Valentin',
  'Angheluță Mircea-Ștefan',
  'Antoniu Sergiu',
  'Avram Adriana-Florentina',
  'Beznea Mihai-Gabriel',
  'Boroș Gabriela-Costina',
  'Budeanu Lucian-Mihai',
  'Bugeac Rareș',
  'Burcin Alexis',
  'Burcea Alexandru-Ștefan-Lucian',
  'Constantinescu Mihai-Ștefan',
  'Costache Eduard-Gabriel',
  'Dinu Silviu-Ion',
  'Dugan Ana-Raluca',
  'Dugan Petru-Valentin',
  'Enache Adrian',
  'Gheorghe Eduard',
  'Mareș Andrei-Viorel',
  'Mihalașcu Alexandru',
  'Milotai Eduard-Nicușor',
  'Mîrzea Matei-Alexandru',
  'Orășanu Ana-Maria',
  'Pencea Alexandru',
  'Perniu Beatrice',
  'Petre Adriana-Roxana',
  'Ploieșteanu Nicolas-Valentin',
  'Popescu Remus-Cristi',
  'Rinu Claudia-Elena',
  'Valceanu Franco-Mihail',
];

const courses = [
    {
        day: 'Luni',
        time: '10:00-11:20',
        name: 'Econometrie ( CURS )',
      },
      {
        day: 'Luni',
        time: '11:30-12:50',
        name: 'Sisteme de analiza ( SEMINAR )',
      },
      {
        day: 'Luni',
        time: '13:30-14:50',
        name: 'Engleza ( SEMINAR )',
      },
      {
        day: 'Luni',
        time: '16:30-17:50',
        name: 'Tehnici promotionale ( CURS )',
      },
      {
        day: 'Marti',
        time: '8:30-9:50',
        name: 'Tehnici promotionale ( SEMINAR )',
      },
      {
        day: 'Marti',
        time: '10:00-11:20',
        name: 'Econometrie ( SEMINAR )',
      },
      {
        day: 'Marti',
        time: '11:30-12:50',
        name: 'JAVA ( CURS )',
      },
      {
        day: 'Marti',
        time: '13:30-14:50',
        name: 'Sisteme de analiza ( CURS )',
      },
      {
        day: 'Joi',
        time: '13:30-14:50',
        name: 'C# ( CURS )',
      },
      {
        day: 'Joi',
        time: '15:00-16:20',
        name: 'JAVA ( SEMINAR )',
      },
      {
        day: 'Joi',
        time: '16:30-17:50',
        name: 'C# ( SEMINAR )',
      },
];

function SchedulePage() {
  const classes = useStyles();
  const [presentStudents, setPresentStudents] = useState([]);

  const handleStudentClick = (student) => {
    if (presentStudents.includes(student)) {
      setPresentStudents(presentStudents.filter((s) => s !== student));
    } else {
      setPresentStudents([...presentStudents, student]);
    }
  };

  const handleGenerateMessage = () => {
    const date = new Date();
    const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    const course = courses.find((c) => c.day === currentDay && c.time === currentTime);
    const message = `Data ${formattedDate} - ${course.name} - Lista Prezenta:\n${presentStudents
      .map((student, index) => `${index + 1}. ${student}`)
      .join('\n')}`;
  
    const textArea = document.createElement('textarea');
    textArea.value = message;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try {
      document.execCommand('copy');
      alert('Mesajul de prezență a fost copiat în clipboard.');
    } catch (err) {
      console.error('Could not copy text: ', err);
    } finally {
      document.body.removeChild(textArea);
    }
  };
  

  const [currentDay, setCurrentDay] = useState('Luni');
  const [currentTime, setCurrentTime] = useState('10:00-11:20');

  const handleDayChange = (day) => {
    setCurrentDay(day);
    setCurrentTime(courses.find((c) => c.day === day).time);
  };

  const handleTimeChange = (time) => {
    setCurrentTime(time);
  };

  return (
    <Container>
      <Box className={classes.root}>
        <Container maxWidth="lg" className={classes.container}>
          <h1 style={{ textAlign: 'center' }}>Prezență RAU</h1>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateMessage}
            disabled={presentStudents.length === 0}
            style={{ minWidth: '300px' }}
          >
            Generează și copiază mesaj de prezență
          </Button>
        </div>
        </Container>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <span style={{ marginRight: '10px' }}>Selectează ziua:</span>
          {['Luni', 'Marti', 'Joi'].map((day) => (
            <Button
              key={day}
              variant={day === currentDay ? 'contained' : 'outlined'}
              color={day === currentDay ? 'primary' : 'default'}
              onClick={() => handleDayChange(day)}
              style={{ margin: '5px' }}
            >
              {day}
            </Button>
          ))}
        </div>
        <div style={{ marginTop: '20px', display: 'flex',justifyContent: 'center' }}>
          <span style={{ marginRight: '10px' }}>Selectează ora:</span>
          {courses
            .filter((course) => course.day === currentDay)
            .map((course) => (
              <Button
                key={course.time}
                variant={course.time === currentTime ? 'contained' : 'outlined'}
                color={course.time === currentTime ? 'primary' : 'default'}
                onClick={() => handleTimeChange(course.time)}
                style={{ margin: '5px' }}
              >
                {course.time}
              </Button>
            ))}
        </div>
        <TableContainer
          component={Paper}
          style={{ marginTop: '20px', maxWidth: '100%', overflowX: 'auto' }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nr.</TableCell>
                <TableCell>Student</TableCell>
                <TableCell>Prezent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentList.map((student, index) => (
                <TableRow key={student}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{student}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color={presentStudents.includes(student) ? 'primary' : 'default'}
                      onClick={() => handleStudentClick(student)}
                    >
                      {presentStudents.includes(student) ? 'Da' : 'Nu'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default SchedulePage;


//old version
// import React, { useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Container,
// } from '@material-ui/core';

// const studentList = [
//   'Achirei Alexandru-Florin',
//   'Albu David',
//   'Andrei Mihai-Valentin',
//   'Angheluță Mircea-Ștefan',
//   'Antoniu Sergiu',
//   'Avram Adriana-Florentina',
//   'Beznea Mihai-Gabriel',
//   'Boroș Gabriela-Costina',
//   'Budeanu Lucian-Mihai',
//   'Bugeac Rareș',
//   'Burcin Alexis',
//   'Burcea Alexandru-Ștefan-Lucian',
//   'Constantinescu Mihai-Ștefan',
//   'Costache Eduard-Gabriel',
//   'Dinu Silviu-Ion',
//   'Dugan Ana-Raluca',
//   'Dugan Petru-Valentin',
//   'Enache Adrian',
//   'Gheorghe Eduard',
//   'Mareș Andrei-Viorel',
//   'Mihalașcu Alexandru',
//   'Milotai Eduard-Nicușor',
//   'Mîrzea Matei-Alexandru',
//   'Orășanu Ana-Maria',
//   'Pencea Alexandru',
//   'Perniu Beatrice',
//   'Petre Adriana-Roxana',
//   'Ploieșteanu Nicolas-Valentin',
//   'Popescu Remus-Cristi',
//   'Rinu Claudia-Elena',
//   'Valceanu Franco-Mihail',
// ];

// const courses = [
//     {
//         day: 'Luni',
//         time: '10:00-11:20',
//         name: 'Econometrie ( CURS )',
//       },
//       {
//         day: 'Luni',
//         time: '11:30-12:50',
//         name: 'Sisteme de analiza ( SEMINAR )',
//       },
//       {
//         day: 'Luni',
//         time: '13:30-14:50',
//         name: 'Engleza ( SEMINAR )',
//       },
//       {
//         day: 'Luni',
//         time: '16:30-17:50',
//         name: 'Tehnici promotionale ( CURS )',
//       },
//       {
//         day: 'Marti',
//         time: '8:30-9:50',
//         name: 'Tehnici promotionale ( SEMINAR )',
//       },
//       {
//         day: 'Marti',
//         time: '10:00-11:20',
//         name: 'Econometrie ( SEMINAR )',
//       },
//       {
//         day: 'Marti',
//         time: '11:30-12:50',
//         name: 'JAVA ( CURS )',
//       },
//       {
//         day: 'Marti',
//         time: '13:30-14:50',
//         name: 'Sisteme de analiza ( CURS )',
//       },
//       {
//         day: 'Joi',
//         time: '13:30-14:50',
//         name: 'C# ( CURS )',
//       },
//       {
//         day: 'Joi',
//         time: '15:00-16:20',
//         name: 'JAVA ( SEMINAR )',
//       },
//       {
//         day: 'Joi',
//         time: '16:30-17:50',
//         name: 'C# ( SEMINAR )',
//       },
// ];

// function SchedulePage() {
//   const [presentStudents, setPresentStudents] = useState([]);

//   const handleStudentClick = (student) => {
//     if (presentStudents.includes(student)) {
//       setPresentStudents(presentStudents.filter((s) => s !== student));
//     } else {
//       setPresentStudents([...presentStudents, student]);
//     }
//   };

//   const handleGenerateMessage = () => {
//     const date = new Date();
//     const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
//     const course = courses.find(
//       (c) => c.day === currentDay && c.time === currentTime
//     );
//     const message = `Data ${formattedDate} - ${course.name} - Lista Prezenta:\n${presentStudents.join(
//       '\n'
//     )}`;
//     navigator.clipboard.writeText(message).then(
//       () => {
//         alert('Mesajul de prezență a fost copiat în clipboard.');
//       },
//       (err) => {
//         alert('Nu s-a putut copia mesajul în clipboard. Te rugăm să încerci din nou.');
//       }
//     );
//   };
  
  

//   const [currentDay, setCurrentDay] = useState('Luni');
//   const [currentTime, setCurrentTime] = useState('10:00-11:20');

//   const handleDayChange = (day) => {
//     setCurrentDay(day);
//     setCurrentTime(courses.find((c) => c.day === day).time);
//   };

//   const handleTimeChange = (time) => {
//     setCurrentTime(time);
//   };

//   return (
//     <Container>
//     <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Prezență RAU</h1>
//     <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleGenerateMessage}
//         disabled={presentStudents.length === 0}
//         style={{ minWidth: '300px' }}
//       >
//         Generează și copiază mesaj de prezență
//       </Button>
//     </div>
//     <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
//       <span style={{ marginRight: '10px' }}>Selectează ziua:</span>
//       {['Luni', 'Marti', 'Joi'].map((day) => (
//         <Button
//           key={day}
//           variant={day === currentDay ? 'contained' : 'outlined'}
//           color={day === currentDay ? 'primary' : 'default'}
//           onClick={() => handleDayChange(day)}
//           style={{ margin: '5px' }}
//         >
//           {day}
//         </Button>
//       ))}
//     </div>
//     <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
//       <span style={{ marginRight: '10px' }}>Selectează ora:</span>
//       {courses
//         .filter((course) => course.day === currentDay)
//         .map((course) => (
//           <Button
//             key={course.time}
//             variant={course.time === currentTime ? 'contained' : 'outlined'}
//             color={course.time === currentTime ? 'primary' : 'default'}
//             onClick={() => handleTimeChange(course.time)}
//             style={{ margin: '5px' }}
//           >
//             {course.time}
//           </Button>
//         ))}
//     </div>
//     <TableContainer component={Paper} style={{ marginTop: '20px' }}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Ziua</TableCell>
//             <TableCell>Ora</TableCell>
//             <TableCell>Materia</TableCell>
//             <TableCell>Studenti Prezenti</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {courses.map((course) => (
//             <TableRow key={course.time}>
//               <TableCell>{course.day}</TableCell>
//               <TableCell>{course.time}</TableCell>
//               <TableCell>{course.name}</TableCell>
//               <TableCell>
//                 {course.day === currentDay && course.time === currentTime ? (
//                   studentList.map((student) =>                <Button
//                   key={student}
//                   variant={
//                     presentStudents.includes(student)
//                       ? 'contained'
//                       : 'outlined'
//                   }
//                   color={
//                     presentStudents.includes(student)
//                       ? 'primary'
//                       : 'default'
//                   }
//                   onClick={() => handleStudentClick(student)}
//                   style={{ margin: '5px', textTransform: 'none', fontSize: '0.75rem' }}
//                 >
//                   {student}
//                 </Button>
//               )) : (
//                 <span>-</span>
//               )}
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   </TableContainer>
// </Container>
// );
// }

// export default SchedulePage;