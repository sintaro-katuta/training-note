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
      <>
         {isInstallable ?
            <button className='flex bg-primary rounded-full p-3' onClick={() => onInstallClick()}>
               <p className="pc:text-xl mobile:text-base text-black">インストール</p>
            </button>
         :
            <button className='flex bg-primary rounded-full p-1'>
               <p className="pc:text-xl mobile:text-base text-black">インストール済み</p>
            </button>
         }
      </>
   );
}