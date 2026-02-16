var states = [];
var list = document.getElementById('results');
var searchBox = document.getElementById('search');

function getFlag(code) {
  var c = code.toLowerCase();
  return c === 'dc' ? 'flags/dc.svg' : 'flags/' + c + '.png';
}

function render(data) {
  list.innerHTML = '';
  document.getElementById('no-results').hidden = data.length > 0;

  for (var i = 0; i < data.length; i++) {
    var s = data[i];
    var li = document.createElement('li');
    var flag = '<img class="flag" src="' + getFlag(s.code) + '" alt="' + s.name + '">';
    var note = s.note ? '<span class="note">' + s.note + '</span>' : '';
    var dl = s.deadline ? '<span class="deadline">Register by: ' + s.deadline + '</span>' : '';

    if (s.url) {
      li.innerHTML = '<a href="' + s.url + '" target="_blank">' +
        '<span class="code">' + s.code + '</span>' +
        flag +
        '<span class="state-name">' + s.name + '</span>' +
        note + dl +
        '</a>';
    } else {
      li.className = 'unavailable';
      li.innerHTML = '<a href="#">' +
        flag +
        '<span class="state-name">' + s.name + '</span>' +
        note + dl +
        '<span class="badge">Coming soon</span>' +
        '</a>';
    }
    list.appendChild(li);
  }
}

// load data
fetch('links.json').then(function(r) { return r.json(); }).then(function(data) {
  states = data;
  render(states);
});

// filter on typing
searchBox.addEventListener('input', function() {
  var q = this.value.trim().toLowerCase();
  if (!q) { render(states); return; }

  render(states.filter(function(s) {
    return s.name.toLowerCase().indexOf(q) !== -1 || s.code.toLowerCase() === q;
  }));
});
