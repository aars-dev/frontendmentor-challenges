document.addEventListener("DOMContentLoaded", function () {
  const amountInput = document.getElementById("amount");
  const termInput = document.getElementById("term");
  const interestInput = document.getElementById("interest");
  const repaymentTypeInputs = document.querySelectorAll('input[name="radio"]');
  const submitButton = document.querySelector(".submit-button");
  const resultContainer = document.querySelector(".result-conatiner");
  const resultsText = document.querySelector(".inner-container");
  const clearButton = document.querySelector(".clear-btn");

  const errorMessages = {
    amount: document.querySelector(".amount-input .error"),
    term: document.querySelector(".term .error"),
    interest: document.querySelector(".interest-rate .error"),
    repaymentType: document.querySelector(".mortgage-type .error"),
  };

  const amountInputLabel = document.querySelector(".number-input-label");
  const termInputLabel = document.querySelector(
    ".term-input .number-input-label"
  );
  const interestInputLabel = document.querySelector(
    ".interest-input .number-input-label"
  );
  const amountInputBorderStyle = document.querySelector(".input-section");
  const termInputBorderStyle = document.querySelector(".term-input");
  const interestInputBorderStyle = document.querySelector(".interest-input");

  const errorLabelStyle = "error-label";
  const errorBorderStyle = "error-input-border";

  const showError = (input) => {
    errorMessages[input].classList.remove("invisible");
    [amountInputLabel, termInputLabel, interestInputLabel].forEach((input) => {
      input.classList.add(errorLabelStyle);
    });
    [
      amountInputBorderStyle,
      termInputBorderStyle,
      interestInputBorderStyle,
    ].forEach((input) => {
      input.classList.add(errorBorderStyle);
    });
  };

  const hideError = (input) => {
    errorMessages[input].classList.add("invisible");
    [amountInputLabel, termInputLabel, interestInputLabel].forEach((input) => {
      input.classList.remove(errorLabelStyle);
    });
    [
      amountInputBorderStyle,
      termInputBorderStyle,
      interestInputBorderStyle,
    ].forEach((input) => {
      input.classList.remove(errorBorderStyle);
    });
  };

  const validateInputs = () => {
    let hasError = false;

    if (!parseFloat(amountInput.value)) {
      showError("amount");
      hasError = true;
    }
    if (!parseFloat(termInput.value)) {
      showError("term");
      hasError = true;
    }
    if (!parseFloat(interestInput.value) / 100 / 12) {
      showError("interest");
      hasError = true;
    }
    if (!document.querySelector('input[name="radio"]:checked')) {
      showError("repaymentType");
      hasError = true;
    }

    return hasError;
  };

  // Store the initial HTML content of the result container
  const initialResultContent = resultsText.innerHTML;

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Hide all error messages initially
    Object.keys(errorMessages).forEach(hideError);

    // Validate inputs
    if (validateInputs()) {
      return; // Exit if there are errors
    }

    const amount = parseFloat(amountInput.value);
    const term = parseFloat(termInput.value);
    const interestRate = parseFloat(interestInput.value) / 100 / 12; // Monthly interest rate
    const repaymentType = document.querySelector(
      'input[name="radio"]:checked'
    ).id;

    let monthlyRepayment;
    if (repaymentType === "radio-repayment") {
      const numberOfPayments = term * 12;
      monthlyRepayment =
        (amount * interestRate) /
        (1 - Math.pow(1 + interestRate, -numberOfPayments));
    } else {
      monthlyRepayment = amount * interestRate; // Interest-only mortgage calculation
    }

    const totalRepayment = monthlyRepayment * term * 12;

    // Display results
    resultsText.innerHTML = `
          <div class="inner-container h-full">
              <h2 class="text-white">Your results</h2>
              <p class="text-slate-500 mt-8 text-base tracking-wider">
                  Your results are shown below based on the information you provided.
                  To adjust the result, edit the form and click "calculate repayments" again.
              </p>
              <div class="mt-4">
                  <span class="inline-block bg-lime w-full h-1.5 rounded-t-2xl mb-[-8px]"></span>
                  <div class="bg-[#0e232f] h-full rounded-[0.5rem] p-8">
                      <p class="text-base text-slate-500 font-semibold">Your monthly repayments</p>
                      <p class="text-6xl max-md:text-5xl max-sm:text-4xl font-bold text-lime/80 mt-6">£${monthlyRepayment.toFixed(
                        2
                      )}</p>
                      <span class="inline-block bg-slate-900 w-full h-0.5 my-10"></span>
                      <p class="text-base text-slate-500 font-semibold mb-5">Total you'll repay over the term</p>
                      <p class="text-2xl font-bold text-white mt-[-10px]">£${totalRepayment.toFixed(
                        2
                      )}</p>
                  </div>
              </div>
          </div>
      `;
    resultContainer.classList.remove("invisible");
  });

  clearButton.addEventListener("click", function () {
    // Clear input fields
    amountInput.value = "";
    termInput.value = "";
    interestInput.value = "";
    repaymentTypeInputs.forEach((input) => (input.checked = false));

    // Hide all error messages
    Object.keys(errorMessages).forEach(hideError);

    // Clear results
    resultsText.innerHTML = initialResultContent;
    resultContainer.classList.remove("invisible");
  });

  // Add event listeners to inputs to hide error messages on input
  [amountInput, termInput, interestInput].forEach((input) => {
    input.addEventListener("input", () => hideError(input.id));
  });

  repaymentTypeInputs.forEach((input) => {
    input.addEventListener("change", () => hideError("repaymentType"));
  });
});
