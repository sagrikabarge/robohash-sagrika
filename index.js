const fs = require("fs");
const superagent = require("superagent");

// Function to generate random string

// declare all characters
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function randomString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

// async function

async function getRandomPic() {
    try {
        const res1 = await superagent.get(`https://robohash.org/${randomString(5)}`)
        console.log('Random image is ', res1.request.url)
        const res2 = await superagent.get(`https://robohash.org/${randomString(5)}`)
        console.log('Random image is ', res2.request.url)
        const res3 = await superagent.get(`https://robohash.org/${randomString(5)}`)
        console.log('Random image is ', res3.request.url)

        const all = await Promise.all([res1, res2, res3])
        const images = all.map((el) => el.request.url)
        console.log(images);
        await writeFilePromise('./randomImage.txt', images.join("\n"))
        console.log('sucessfully written the file')
    } catch (err) {
      throw err
    }
    console.log('2. complete')
  }
  console.log('1. start')
  ;(async () => {
    try {
      await getRandomPic()
      console.log('3. end')
    } catch (err) {
      console.log('3. end due to error')
    }
  })()


//Promises
// function writeFilePromise(fileLocation, result) {
//     return new Promise((resolve, reject) => {
//         fs.writeFile(fileLocation, result, (err) => {
//             if (err) {
//                 reject('not able to write to the file')
//             }
//             resolve()
//         })
//     })
// }
// superagent.get(`https://robohash.org/${randomString(6)}`)
//     .end((err, res) => {
//         console.log(res.request.url);
//         return writeFilePromise('./randomImage.txt', res.request.url)
//     .then(() => {
//         console.log('Sucessfully written the file')
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })


// Callbacks
// superagent
//     .get(`https://robohash.org/${randomString(5)}`)
//     .end((err, res) => {
//         console.log(res.request.url);
//         fs.writeFile("./randomImage.txt", res.request.url, (err) => {
//             if (err) {
//                 console.log("Not able to write image in txt file", err);
//                 return;
//             }
//             console.log('Random Image successfully written inside the file');
//         });
//     });