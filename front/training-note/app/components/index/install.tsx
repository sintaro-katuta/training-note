import { useState, useEffect } from "react";
interface BeforeInstallPromptEvent extends Event {
   prompt: () => void;
   userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function Install() {
   const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
   const [isInstallable, setIsInstallable] = useState(false);
   useEffect(() => {
      window.addEventListener("beforeinstallprompt", (e) => {
         setDeferredPrompt(e as BeforeInstallPromptEvent);
         setIsInstallable(true);
      });
   }, []);

   const onInstallClick = async () => {
      if (!deferredPrompt) {
         return;
      }
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
         setDeferredPrompt(null);
         setIsInstallable(false);
      } else {
         setIsInstallable(true);
      }
   };
   return (
      <div>
         {isInstallable ?
            <button className='flex bg-primary rounded-full p-1' onClick={() => onInstallClick()}>
               <p>インストール</p>
            </button>
         :
            <button className='flex bg-primary rounded-full p-1'>
               <p>インストール済み</p>
            </button>
         }
      </div>
   );
}