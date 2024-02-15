type Form2Data = {
  users: string;
};

type Form2Props = Form2Data & {
  updateFields: (fields: Partial<Form2Data>) => void;
};
export function GroupForm2({ users, updateFields }: Form2Props) {
  return (
    <>
      <label> Invite your friends...</label>
      <input autoFocus required type="text" value={users} onChange={(e) => updateFields({ users: e.target.value })} />
    </>
  );
}
