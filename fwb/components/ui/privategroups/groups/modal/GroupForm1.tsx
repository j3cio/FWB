type Form1Data = {
  name: string;
  description: string;
};

type Form1Props = Form1Data & {
  updateFields: (fields: Partial<Form1Data>) => void;
};

export function GroupForm1({ name, description, updateFields }: Form1Props) {
  return (
    <>
      <label> Group Name</label>
      <input
        autoFocus
        required
        type="text"
        value={name}
        onChange={(e) => updateFields({ name: e.target.value })}
      />
      <label> Description </label>
      <input required type="text" value={description} onChange={(e) => updateFields({ description: e.target.value })} />
    </>
  );
}
