$(function() {
    // load();         // 현재상태 불러오기
    // will_save();    // 현재상태 저장대기
});

// 현재상태 불러오기
function load() {
    const subjectTree = localStorage.getItem('subjectTree');
    if (subjectTree !== null) {
        document.getElementById("main-navigation").innerHTML = subjectTree;
    }
}

// 현재상태 저장대기
function will_save() {
    let subjects = document.querySelectorAll(".subject");
    subjects.forEach((subject) => subject.addEventListener("click", function() {
        let subjectTree = document.getElementById("main-navigation").innerHTML;
        localStorage.setItem("subjectTree", subjectTree);
    }));
}