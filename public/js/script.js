let selectedCount = 0
let selectedIds = []

function calculateSelectedCount() {
    let count;
    
    $('.todo').forEach(function(t) {
        if ($(t).attr('class').includes('selected')) {
            count++
        }
    })
    return count
}

$('.todo').click(function() {
    let todo = $(this)
    let selectedId = todo[0].childNodes[1].value
    $(this).toggleClass('selected')
    if ($(this).attr('class').includes('selected')) {
        selectedIds.push(selectedId)
        selectedCount++
    } else {
        selectedIds = selectedIds.filter((id) => id != selectedId)
        selectedCount--
    }

    if (selectedCount) {
        $('.delete-selected').css('visibility', 'visible')
    } else {
        $('.delete-selected').css('visibility', 'hidden')

    }
})

$('.delete-selected button').click((e) => {
    e.preventDefault()
    let details = {
        ids: selectedIds
    }
    
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
fetch("http://localhost:3000/todos/delete-selected?_method=DELETE", {
  method: "POST",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },

  //make sure to serialize your JSON body
  body: formBody
})
.then( (response) => { 
   console.log(response)
   window.location.reload()
});
})




