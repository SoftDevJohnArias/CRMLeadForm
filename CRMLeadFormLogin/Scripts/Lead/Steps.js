const stepsModule = (() => {
  const renderSteps = ({ steps = [] }) => {
     
    document.querySelector(".content-steps").innerHTML = templateLead.createTemplateSteps({ steps })
  };


  const goToStep = ({ currentStepId, goStepId, goBack = false }) => {
    const $contentSteps = document.querySelector(".content-steps");
    const $currentStep = $contentSteps.querySelector(`#setep-${currentStepId}`);
    const $goStepId = document.querySelector(`#setep-${goStepId}`);

    if (goBack) {
      //set class active state
      $currentStep.classList.remove("active");
      $currentStep.classList.add("inactive", "fade-anima");

      //clear icon complete step if  replace number step
      $goStepId.querySelector(".number-step").innerHTML = $goStepId.dataset.numberstep;

      //set next step to active
      $goStepId.classList.remove("complete");
      $goStepId.classList.add("active");


    } else {
      //set class complete state
      $currentStep.classList.remove("active");
      $currentStep.classList.add("complete", "fade-anima");

      //clear number step if complete and replace icon check
      $currentStep.querySelector(".number-step").innerHTML = "";

      //set next step to active
      $goStepId.classList.remove("inactive");
      $goStepId.classList.add("active");
    }

    confi.scrollTo(0, 600);
  };

  const setNextStep = ({ stepIdComplete, nextStepId }) => {
     ;
    goToStep({ currentStepId: stepIdComplete, goStepId: nextStepId });
  };

  const goBackStep = ({ currentStepId, prevStepId }) => {
    goToStep({ currentStepId, goStepId: prevStepId, goBack: true });
  };

  return {
    renderSteps,
    setNextStep,
    goBackStep,
  };
})();
