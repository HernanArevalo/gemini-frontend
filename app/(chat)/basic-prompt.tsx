import { ChatMessages } from '@/components/chat/ChatMessages';
import CustomInputBox from '@/components/chat/CustomInputBox';
import { useBasicPromptStore } from '@/store/basic-prompt/basicPrompt.store';
import { Layout } from '@ui-kitten/components';

const BasicPromptScreen = () => {

  const messages = useBasicPromptStore((state)=> state.messages);
  const addMessage = useBasicPromptStore((state) => state.addMessage)

  return (
    <Layout style={{ flex: 1 }}>
      <ChatMessages messages={messages} />

      <CustomInputBox onSendMessage={addMessage} />
    </Layout>
  );
};

export default BasicPromptScreen;
