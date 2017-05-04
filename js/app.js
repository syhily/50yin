var correct = 0
var limit = 100
var current_count = 0
var errors = []
var timer = []
var now_timestamp = 0
var tings = []
var tings_limit = 50
var order = 0
var romas = []

var chars = {
  aline: ['あ', 'い', 'う', 'え', 'お', 'ア', 'イ', 'ウ', 'エ', 'オ'],
  kaline: ['か', 'き', 'く', 'け', 'こ', 'カ', 'キ', 'ク', 'ケ', 'コ'],
  saline: ['さ', 'し', 'す', 'せ', 'そ', 'サ', 'シ', 'ス', 'セ', 'ソ'],
  taline: ['た', 'ち', 'つ', 'て', 'と', 'タ', 'チ', 'ツ', 'テ', 'ト'],
  naline: ['な', 'ナ', 'に', 'ニ', 'ぬ', 'ヌ', 'ね', 'ネ', 'の', 'ノ'],
  haline: ['は', 'ハ', 'ひ', 'ヒ', 'ふ', 'フ', 'へ', 'ヘ', 'ほ', 'ホ'],
  maline: ['ま', 'マ', 'み', 'ミ', 'む', 'ム', 'め', 'メ', 'も', 'モ'],
  yaline: ['や', 'ヤ', 'い', 'イ', 'ゆ', 'ユ', 'え', 'エ', 'よ', 'ヨ'],
  raline: ['ら', 'ラ', 'り', 'リ', 'る', 'ル', 'れ', 'レ', 'ろ', 'ロ'],
  waline: ['わ', 'ワ', 'い', 'イ', 'う', 'ウ', 'え', 'エ', 'を', 'ヲ']
}
var bingo = {
  'あ': 'a',
  'い': 'i',
  'う': 'u',
  'え': 'e',
  'お': 'o',
  'ア': 'a',
  'イ': 'i',
  'ウ': 'u',
  'エ': 'e',
  'オ': 'o',
  'か': 'ka',
  'き': 'ki',
  'く': 'ku',
  'け': 'ke',
  'こ': 'ko',
  'カ': 'ka',
  'キ': 'ki',
  'ク': 'ku',
  'ケ': 'ke',
  'コ': 'ko',
  'さ': 'sa',
  'し': 'shi',
  'す': 'su',
  'せ': 'se',
  'そ': 'so',
  'サ': 'sa',
  'シ': 'shi',
  'ス': 'su',
  'セ': 'se',
  'ソ': 'so',
  'た': 'ta',
  'タ': 'ta',
  'ち': 'chi',
  'チ': 'chi',
  'つ': 'tsu',
  'ツ': 'tsu',
  'て': 'te',
  'テ': 'te',
  'と': 'to',
  'ト': 'to',
  'な': 'na',
  'ナ': 'na',
  'に': 'ni',
  'ニ': 'ni',
  'ぬ': 'nu',
  'ヌ': 'nu',
  'ね': 'ne',
  'ネ': 'ne',
  'の': 'no',
  'ノ': 'no',
  'は': 'ha',
  'ハ': 'ha',
  'ひ': 'hi',
  'ヒ': 'hi',
  'ふ': 'fu',
  'フ': 'fu',
  'へ': 'he',
  'ヘ': 'he',
  'ほ': 'ho',
  'ホ': 'ho',
  'ま': 'ma',
  'マ': 'ma',
  'み': 'mi',
  'ミ': 'mi',
  'む': 'mu',
  'ム': 'mu',
  'め': 'me',
  'メ': 'me',
  'も': 'mo',
  'モ': 'mo',
  'や': 'ya',
  'ヤ': 'ya',
  'ゆ': 'yu',
  'ユ': 'yu',
  'よ': 'yo',
  'ヨ': 'yo',
  'ら': 'ra',
  'ラ': 'ra',
  'り': 'ri',
  'リ': 'ri',
  'る': 'ru',
  'ル': 'ru',
  'れ': 're',
  'レ': 're',
  'ろ': 'ru',
  'ロ': 'ru',
  'わ': 'wa',
  'ワ': 'wa',
  'を': 'o',
  'ヲ': 'o'
}

function getKeyByValue (arr, value) {
  for (var prop in arr) {
    if (arr.hasOwnProperty(prop)) {
      if (arr[prop] === value)
        return prop;
    }
  }
}

function getUnique (arr){
   var u = {}, a = [];
   for(var i = 0, l = arr.length; i < l; ++i){
      if(u.hasOwnProperty(arr[i])) {
         continue;
      }
      a.push(arr[i]);
      u[arr[i]] = 1;
   }
   return a;
}

var target = $('.output')

$(function() {

  $('body')
    .on('click', '#tingstop', function() {
      tingStop()
    })
    .on('click', '.choice', function() {
      el = $(this)


      if (current_count >= 100) {
        clockStop()
        return
      } else {
        $('#result').html(correct + 1 + '/100')
      }
      var your_answer = $(this).text()
      if (!your_answer) {
        alert('你必须先回答这道题才能继续!')
        return
      }
      var item = $('#char').html()
      if (bingo[item] == your_answer) {
        correct++
      } else {
        errors.push({
          name: item,
          sound: bingo[item]
        })

      }
      current_count++
      clockStop(timer)
      renderQ(el.data('id'))
    })
})

function render(tpl, data) {
  var template = $('#' + tpl + '-template').html()
  Mustache.parse(template)
  var rendered = Mustache.render(template, data)
  target.html(rendered)
  var newDivs = reorderDivs('.choice')
  $('.choices').html(newDivs)

}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)]
}

function renderQ(id) {
  var item = randomItem(chars[id])
  render(id, {
    char_name: item,
    current_count: current_count,
    errors: errors,
    correct: correct,
    wrong: current_count - correct
  })
  clockStart()
}

function reorderDivs(className) {
  var newDivs = []
  var length = $(className).length
  for (var i = 0; i < length; i++) {
    var randomIndex = NumberBetween(0, $(className).length)
    newDivs[newDivs.length] = $(className).eq(randomIndex).clone()
    $(className).eq(randomIndex).remove()
  }
  return newDivs


}

function getObjValues(objects) {
  var result = []
  for (var key in objects) {
    result.push(objects[key])
  }
  return result
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function pickRandomProperty(obj) {
  var result;
  var count = 0;
  for (var prop in obj)
    if (Math.random() < 1 / ++count)
      result = prop;
  return result;
}

function NumberBetween(start, end) {
  return Math.floor(Math.random() * end) + start
}

function clockStart() {
  var minutes = parseInt(now_timestamp / 60)
  var seconds = now_timestamp - minutes * 60
  if (minutes.toString().length == 1) {
    minutes = '0' + minutes
  }
  if (seconds.toString().length == 1) {
    seconds = '0' + seconds
  }
  $('.clock').html(minutes + ':' + seconds)
  now_timestamp++
  timer.push(setTimeout(function() {
    clockStart()
  }, 1000))
}

function clockStop(t) {
  for (var i in t) {
    clearTimeout(t[i]);
  }
  t = []
}

function renderT() {
  if(order > romas.length){
    alert('end')
    return
  }
  var roma = romas[order]
  render('tingxie', {
    char_name: roma
  })
  order++
  tings.push(roma)
  countdown()
}

function countdown() {
  if (tings_limit < 0) {
    $('#remains').html('结束')
    return
  }
  timer.push(setTimeout(function() {
    var remains = parseInt($('#remains').html()) - 1
    if (remains < 0) {
      $('#remains').html('3')
      renderT()
      tings_limit--
    } else {
      $('#remains').html(remains)
      countdown()
    }
  }, 1000))


}

function tingStop() {
  clockStop(timer)
}

Q.reg('home', function() {
  errors = []
  tings = []
  correct = 0
  current_count = 0
  now_timestamp = 0
  tingStop()
  render('choose')
})

Q.reg('c', function(line) {
  console.log(line)
  renderQ(line)
})

Q.reg('g', function(line) {
  alert("还没写呢")
})

Q.reg('t', function(line) {
  romas = getObjValues(bingo)
  romas = getUnique(romas)
  shuffle(romas)
  renderT()
})

Q.init({
  index: 'home'
})
