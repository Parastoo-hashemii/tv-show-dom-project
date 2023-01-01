const main = document.querySelector("main");
const section1 = document.createElement("section");
const section2 = document.createElement("section");
section1.className = "container-fluid my-4";
section2.className = "row";
const h4 = document.querySelector("h4");
const inputSearch = document.querySelector(".search-item");
const countriesDropDown = document.querySelector("#bySeason");

fetch("https://api.tvmaze.com/shows/5/episodes")
  .then((res) => {
    console.log(res);
    return res.json();
  })
  .then((data) => {
    //console.log(data);
    mains(data);
  })
  .catch((err) => {
    console.log(err);
  });
section1.append(section2);
main.append(section1);

const getData = (item) => {
  section2.innerHTML = "";
  item.map((ele) => {
    const section3 = document.createElement("section");
    const sectionDiv = document.createElement("div");
    const img = document.createElement("img");
    const divTwo = document.createElement("div");
    const divTree = document.createElement("div");
    const a1 = document.createElement("a");
    const a = document.createElement("a");
    const p = document.createElement("p");
    const episode = ele.number;
    const seasons = ele.season;
    const seasonNumber = Number(seasons).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });
    const episodeNumber = Number(episode).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });

    section3.className = "col-12 col-sm-6 col-lg-3 my-3";
    sectionDiv.className = "card border-0 shadow";
    img.className = "card-img-top";
    divTwo.className = "card-body";
    divTree.className = "cards-name-episode";
    a1.className = "card-title";
    a.className = "btn btn-danger";
    p.className = "card-text";

    img.src = ele.image.medium;
    a1.innerText = ele.name;
    a1.href = ele.url;
    a.innerText = `S${seasonNumber}E${episodeNumber}`;

    p.innerHTML = ele.summary;

    divTree.append(a1);
    divTree.append(a);
    divTwo.append(divTree);
    divTwo.append(p);
    sectionDiv.append(img);
    sectionDiv.append(divTwo);
    section3.append(sectionDiv);
    section2.append(section3);
  });
};

function mains(data) {
  getData(data);

  for (let item of data) {
    const option = document.createElement("option");

    option.value = item.name;
    option.text = ` S0${item.season}E0${item.number}-${item.name}`;
    countriesDropDown.append(option);
  }

  countriesDropDown.addEventListener("change", () => {
    const episode = countriesDropDown.value;

    let singleEpisodeOption = data.filter((val) => val.name === episode);
    if (countriesDropDown.value === "All episodes") {
      getData(data);
    } else {
      getData(singleEpisodeOption);
    }
  });

  inputSearch.addEventListener("input", () => {
    let elementeSearch = data.filter((item) => {
      return (
        item.name.toLowerCase().includes(inputSearch.value) ||
        item.summary.toLowerCase().includes(inputSearch.value)
      );
    });
    h4.innerHTML = `${elementeSearch.length} number of episode`;
    getData(elementeSearch);
  });
}

function searchBar(data) {
  getData(data);
}
