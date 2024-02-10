type Form2Data = {
  invitedMembers: string;
};

type Form2Props = Form2Data & {
  updateFields: (fields: Partial<Form2Data>) => void;
};
export function GroupForm2({ invitedMembers, updateFields }: Form2Props) {
  return (
    <>
      <label> Invite your friends...</label>
      <input
        autoFocus
        required
        type="text"
        value={invitedMembers}
        onChange={(e) => updateFields({ invitedMembers: e.target.value })}
      />
    </>
  );
}
