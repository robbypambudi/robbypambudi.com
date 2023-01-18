import * as React from "react";

import Modal from "@/components/modal/Modal";
import Tag from "@/components/Tag";
import Typography from "@/components/Typography";
import { SkillDataType } from "@/types/entitas/skill";

type ModalReturnType = {
  openModal: (data: SkillDataType) => void;
};

export default function SkillModal({
  children,
}: {
  children: (props: ModalReturnType) => JSX.Element;
}) {
  const [state, setState] = React.useState<SkillDataType>();
  const [open, setOpen] = React.useState(false);
  const modalReturn: ModalReturnType = {
    openModal: (data: SkillDataType) => {
      setState(data);
      setOpen(true);
    },
  };

  return (
    <>
      {children(modalReturn)}
      <Modal open={open} setOpen={setOpen}>
        {state && <SkillBodyModal state={state} />}
      </Modal>
    </>
  );
}

function SkillBodyModal({ state }: { state: SkillDataType }) {
  return (
    <>
      <Modal.Title>
        <Typography as="h3" variant="h3" color="gray">
          {state.technologie}
        </Typography>
        <Typography variant="c2" color="gray" className="">
          # Start From :{" "}
          <span className="text-danger-500 font-semibold">
            {state.start_year}
          </span>
        </Typography>
      </Modal.Title>
      <Modal.Body>
        <div className="">
          <div>
            {state.projects.map((project, index) => (
              <Tag key={index} className="mr-2 mb-2">
                {project}
              </Tag>
            ))}
          </div>
          <div className="mt-4">
            <Typography variant="c2" color="gray" className="text-justify">
              {state.description}
            </Typography>
          </div>
        </div>
      </Modal.Body>
    </>
  );
}
