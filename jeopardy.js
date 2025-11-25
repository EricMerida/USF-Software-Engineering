
const BASE_API_URL = "https://rithm-jeopardy.herokuapp.com/api/"
const NUM_CATEGORIES = 6;
const NUM_QUESTIONS_PER_CAT = 5;
const NUM_CLUES_PER_CAT = 5;

let categories = [];


async function getCategoryIds(catId) {
    let response = await axios.get(`${BASE_API_URL}categories`, {
      params: {count: NUM_CATEGORIES}
    });
  return response.data.map(cat => cat.id);
}

async function getCategory(catId) {
    let response = await axios.get(`${BASE_API_URL}category`, {
        params: { id: catId }
    });
    let cat = response.data;
     let randomClues = _.sampleSize(cat.clues, NUM_QUESTIONS_PER_CAT).map(clue => ({
    question: clue.question,
    answer: clue.answer,
    showing: null
  }));

    return {
        title: cat.title,
        clues: randomClues
    };
}



async function fillTable() {
  hideLoadingView();
    const $thead = $("#jeopardy thead");
  $thead.empty();
  let $tr = $("<tr>")

for (let cat of categories) {
    $tr.append($("<th>").text(cat.title));
  }

  $thead.append($tr);

  const $tbody = $("#jeopardy tbody");
  $tbody.empty();

  for (let clueIdx = 0; clueIdx < NUM_CLUES_PER_CAT; clueIdx++) {
    let $tr = $("<tr>");

    for (let catIdx = 0; catIdx < NUM_CATEGORIES; catIdx++) {
      $tr.append(
        $("<td>")
          .attr("data-cat-idx", catIdx)
          .attr("data-clue-idx", clueIdx)
          .append($("<i>").addClass("fas fa-question-circle fa-3x"))
      );
    }

    $tbody.append($tr);
  }
}


function handleClick(evt) {
  let $tgt = $(evt.target).closest("td");

  let catId = $tgt.data("cat-idx");
  let clueId = $tgt.data("clue-idx");
  
  if (catId === undefined || clueId === undefined) return;
  if (!categories[catId]) return;
  if (!categories[catId].clues[clueId]) return;

  let clue = categories[catId].clues[clueId];

  if (!clue.showing) {
    clue.showing = "question";
    $tgt.text(clue.question);
  } else if (clue.showing === "question") {
    clue.showing = "answer";
    $tgt.text(clue.answer);
  }
}
    // already showing answer; ignore

  // Update text of cell


/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
  // clear the board
  $("#jeopardy thead").empty();
  $("#jeopardy tbody").empty();

  // show the loading icon
  $("#spin-container").show();
  $("#start")
    .addClass("disabled")
    .text("Loading...");
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
  $("#start")
    .removeClass("disabled")
    .text("Restart!");
  $("#spin-container").hide();
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
  let isLoading = $("#start").text() === "Loading...";

  if (!isLoading) {
    showLoadingView();

    let catIds = await getCategoryIds();

    categories = [];

    for (let catId of catIds) {
      categories.push(await getCategory(catId));
    }

    fillTable();
  }
}

/** On click of start / restart button, set up game. */

$("#start").on("click", setupAndStart);

/** On page load, add event handler for clicking clues */

$(async function() {
  $("#jeopardy").on("click", "td", handleClick);
});
