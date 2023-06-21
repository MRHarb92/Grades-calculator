function generateGradeInputs() {
      var numClasses = parseInt(document.getElementById("numClasses").value);
      var gradeInputsDiv = document.getElementById("gradeInputs");
      gradeInputsDiv.innerHTML = ""; // Clear previous inputs
      
      for (var i = 1; i <= numClasses; i++) {
        var label = document.createElement("label");
        label.for = "grade" + i;
        label.textContent = "Grade for Class " + i + ":";
        
        var input = document.createElement("input");
        input.type = "number";
        input.id = "grade" + i;
        input.name = "grade" + i;
        input.required = true;
        input.min = 0;
        input.max = 100;
        
        gradeInputsDiv.appendChild(label);
        gradeInputsDiv.appendChild(input);
        gradeInputsDiv.appendChild(document.createElement("br"));
      }
    }
    //this function to reset the page when the reset button pressed
    function resetForm() {
      document.getElementById("name").value="";
      document.getElementById("ID").value="";
      document.getElementById("gradeForm").reset();
      document.getElementById("gradeInputs").innerHTML = "";
      document.getElementById("results").innerHTML = ".";
    }
    
    function calculateGrades(event) {
      event.preventDefault(); // Prevent form submission
      var name = document.getElementById("name").value;
      var id = document.getElementById("ID").value;

      // Validate student name and ID
      if (name.trim() === "" || id.trim() === "") {
        alert("Please fill in the student name and ID fields.");
    return;
  }
     
      var numClasses = parseInt(document.getElementById("numClasses").value);//the number of classes enrolled
      var totalSum = 0; //variable to store the sum of grades
      var totalCredits = 0;
      for (var i = 1; i <= numClasses; i++) {
        var grade = parseInt(document.getElementById("grade" + i).value); //geting the grade from the input 
        totalSum += grade;
        totalCredits++;
      }
      
      var average = totalSum / totalCredits;
      var alphabeticGrade = calculateAlphabeticGrade(average); //calling another function to get the alphabetic grade
      var resultDiv=document.getElementById("results");//the place where are we going to see the results
      var imageResource; //we want to show happy smile face in case of passed and sad face in case of failed 
      if (alphabeticGrade=="F"){
        imageResource="https://cdn.shopify.com/s/files/1/1061/1924/products/Emoji_Icon_-_Sad_Emoji_large.png?v=1571606093";
      }
      else{
        imageResource="https://cdn.shopify.com/s/files/1/1061/1924/products/Happy_Emoji_Icon_5c9b7b25-b215-4457-922d-fef519a08b06_large.png?v=1571606090";
      }
      //showing the results
      resultDiv.innerHTML = `
      <h3> Student name: ${name}</h3>
      <h3> Student ID: ${id}</h3>
      <img src=${imageResource}alt="70px" width="70px" height="70px"></img>
      <p>average grade: ${average.toFixed(2)}</p>
      <p>lphabetic Grade: ${alphabeticGrade}</P>
      <p>Total Sum: ${totalSum}</p>
      <button type="button" onclick="window.print()">Print</button>
      
      `;
    }
    
    function calculateAlphabeticGrade(average) {
      if (average >= 90) {
        return "A";
      } else if (average >= 80) {
        return "B";
      } else if (average >= 70) {
        return "C";
      } else if (average >= 60) {
        return "D";
      } else {
        return "F";
      }
    }
    
   document.getElementById("numClasses").addEventListener("input", generateGradeInputs);
    document.getElementById("gradeForm").addEventListener("submit", calculateGrades);