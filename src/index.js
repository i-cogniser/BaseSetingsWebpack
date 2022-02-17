import './styles/index.scss'
import $ from 'jquery'
import 'bootstrap'

let userOlder = {
   profwssion: 'Development',
}

let userNew = {
   name: 'Tom',
   age: 30,
   ...userOlder
}

$('.block').html('I am older JQuery')

console.log(userNew);
