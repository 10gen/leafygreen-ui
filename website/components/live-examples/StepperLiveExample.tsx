import React from 'react';
import LiveExample, { KnobsConfigInterface } from '@leafygreen-ui/live-example';
import { Step, Stepper } from '@leafygreen-ui/stepper';

const knobsConfig: KnobsConfigInterface<{ currentStep: number }> = {
  currentStep: {
    type: 'number',
    default: 0,
    label: 'Current Step',
  },
};

function DefaultExample({ currentStep }: { currentStep: number }) {
  const step = currentStep > 6 ? 6 : currentStep < 0 ? 0 : currentStep;

  return (
    <div style={{ width: 1000 }}>
      <Stepper currentStep={step} maxDisplayedSteps={5}>
        <Step>Overview</Step>
        <Step>Configuration</Step>
        <Step>Update</Step>
        <Step>Install</Step>
        <Step>Billing</Step>
        <Step>Address</Step>
        <Step>Confirmation</Step>
      </Stepper>
    </div>
  );
}

const StepperLiveExample = () => {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <DefaultExample {...props} />}
    </LiveExample>
  );
};

export default StepperLiveExample;
