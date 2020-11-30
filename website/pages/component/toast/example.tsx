import React from 'react';
import Toast, { Variant } from '@leafygreen-ui/toast';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const knobsConfig: KnobsConfigInterface<{
  variant: Variant;
  progress: number;
  close: boolean;
}> = {
  variant: {
    type: 'select',
    options: Object.values(Variant),
    default: Variant.Success as Variant,
    label: 'Variant',
  },
  progress: {
    type: 'number',
    default: 1,
    label: 'Progress',
  },
  close: {
    type: 'boolean',
    default: false,
    label: 'Close',
  },
};

export default function ToastLiveExample() {
  const [open, setOpen] = React.useState(false);

  return (
    <LiveExample knobsConfig={knobsConfig}>
      {({ variant, progress, close, ...rest }) => (
        <>
          <button onClick={() => setOpen(curr => !curr)}>Trigger toast</button>
          <Toast
            progress={progress}
            close={close ? () => {} : undefined}
            open={open}
            variant={variant}
            body={
              variant === 'success'
                ? 'You have successfully linked your MongoDB account LeafyCorp to your GCP account.'
                : 'Currently: capturing backup snapshot'
            }
            title={
              variant === 'success' ? 'Success!' : 'Deploying your change.'
            }
            {...rest}
          />
        </>
      )}
    </LiveExample>
  );
}
