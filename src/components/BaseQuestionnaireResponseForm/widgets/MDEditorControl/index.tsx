import { QuestionItemProps } from 'sdc-qrf';

import { useFieldController } from 'src/components/BaseQuestionnaireResponseForm/hooks';

import { MarkDownEditor } from './MarkDownEditor';
import { Form } from 'antd';

export function MDEditorControl({ parentPath, questionItem }: QuestionItemProps) {
    const { linkId } = questionItem;
    const fieldName = [...parentPath, linkId, 0, 'value', 'string'];
    const { value, onChange, formItem } = useFieldController(fieldName, questionItem);

    return (
        <Form.Item {...formItem}>
            <MarkDownEditor markdownString={value} onChange={onChange} readOnly={questionItem.readOnly} />
        </Form.Item>
    );
}
