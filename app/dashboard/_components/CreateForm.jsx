'use client'

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiChatSession } from "@/configs/AiModal";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const PROMPT = 'On the basis of description, please give form in json format with form title, form subheading with form having form field, field type, form name, placeholder name & form label, field type, field required in Json format'

const CreateForm = () => {

  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState();
  const [loading, setLoading] = useState();
  const { user } = useUser();
  const route = useRouter();

  const onCreateForm = async () => {
    setLoading(true);

    const result = await AiChatSession.sendMessage('Description:' + userInput + PROMPT);
    console.log(result.response.text());
    if(result.response.text()) {
      const resp = await db.insert(JsonForms)
      .values({
        jsonform: result.response.text(),
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD/MM/yyyy')
      }).returning({ id: JsonForms.id });

      console.log('New Form ID', resp[0].id);
      if(resp[0].id) {
        route.push('/edit-form/' + resp[0].id);
      }
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <div>
      <Button onClick={() => setOpenDialog(true)}>+ Create Form</Button>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>
              <Textarea
                className='my-2'
                placeholder='Write description of your form'
                onChange={(event) => setUserInput(event.target.value)}
              />
              <div className="flex gap-2 my-3 justify-end">
                <Button onClick={() => setOpenDialog(false)} variant='destructive'>Cancel</Button>
                <Button disabled={loading} onClick={() => onCreateForm()}>
                  { loading ? <Loader2 className="animate-spin" /> : 'Create' }
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateForm;
