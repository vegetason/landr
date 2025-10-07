'use client';

import { Button } from '@/components/ui/button';
import { env } from '@/data/env/client';
import { experienceLevelEnum, JobInfoTable } from '@/drizzle/schema';
import CondensedMessages from '@/services/hume/components/CondensedMessages';
import { condensedChatMessages } from '@/services/hume/lib/condensedChatMessages';
import { useVoice, VoiceReadyState } from '@humeai/voice-react';
import { Loader2Icon, MicIcon, MicOff, PhoneOffIcon } from 'lucide-react';
import { useMemo } from 'react';

const StartCall = ({
  jobInfo,
  user,
  accessToken,
}: {
  jobInfo: Pick<
    typeof JobInfoTable.$inferSelect,
    'id' | 'description' | 'experience' | 'title'
  >;
  user: {
    name: string;
    imageUrl: string;
  };
  accessToken: string;
}) => {
  const { connect, readyState, disconnect } = useVoice();
  if (readyState === VoiceReadyState.IDLE) {
    return (
      <div
        className="flex justify-center items-center h-screen-header flex-1 w-full"
        onClick={async () => {
            
          connect({
            auth: { type: 'accessToken', value: accessToken },
            configId: env.NEXT_PUBLIC_HUME_CONFIG_ID,
            sessionSettings: {
              type: 'session_settings',
              variables: {
                userName: user.name,
                title: jobInfo.title || 'Not specified',
                description: jobInfo.description,
                experienceLevel: jobInfo.experience,
              },
            },
          });
        }}
      >
        <Button size="lg">Start Interview</Button>
      </div>
    );
  }

  if (
    readyState === VoiceReadyState.CONNECTING ||
    readyState === VoiceReadyState.CLOSED
  ) {
    return (
      <div className="h-screen-header flex items-center justify-center w-full flex-1">
        <Loader2Icon className="size-24 animate-spin m-auto" />
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-screen-header flex flex-col-reverse w-full">
      <div className="container py-6 flex flex-col items-center justify-end gap-4">
        <Messages user={user} />
        <Controls />
      </div>
    </div>
  );
};
function Messages({ user }: { user: { name: string; imageUrl: string } }) {
  const { messages, fft } = useVoice();
  const condensedMessages = useMemo(() => {
    return condensedChatMessages(messages);
  
  }, [messages]);
  return (
    <CondensedMessages
      messages={condensedMessages}
      user={user}
      maxFft={Math.max(...fft)}
      className="max-w-5xl"
    />
  );
}

function Controls() {
  const { disconnect, isMuted, mute, unmute, micFft, callDurationTimestamp } =
    useVoice();

  return (
    <div className="flex gap-5 rounded border px-5 py-2 w-fit sticky bottom-6 bg-background items-center">
      <Button
        variant="ghost"
        size="icon"
        className="-mx-3"
        onClick={() => (isMuted ? unmute() : mute())}
      >
        {isMuted ? <MicOff className="text-destructive" /> : <MicIcon />}
        <span className="sr-only">{isMuted ? 'UnMute' : 'Mute'}</span>
      </Button>
      <div className="self-stretch">
        <FftVisualizer fft={micFft} />
      </div>
      <div className="text-sm text-muted-foreground tabular-nums">
        {callDurationTimestamp}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="-mx-3"
        onClick={disconnect}
      >
        <PhoneOffIcon className="text-destructive" />
        <span className="sr-only">End Call</span>
      </Button>
    </div>
  );
}

function FftVisualizer({ fft }: { fft: number[] }) {
  return (
    <div className="flex gap-1 items-center h-full">
      {fft.map((value, index) => {
        const percent = (value / 4) * 100;
        return (
          <div
            className="min-h-0.5 bg-primary/75 w-0.5 rounded"
            key={index}
            style={{ height: `${percent < 10 ? 0 : percent}%` }}
          />
        );
      })}
    </div>
  );
}
export default StartCall;
