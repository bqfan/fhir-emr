import { useService } from 'aidbox-react/lib/hooks/service';
import { failure, success } from 'aidbox-react/lib/libs/remoteData';

import config from 'shared/src/config';

import { sharedAppleIdentityToken } from 'src/sharedState';

export interface WearablesDataRecord {
    sid: string;
    ts: string;
    start: string;
    finish: string;
    code?: string;
    duration?: number;
    energy?: number;
}

export function usePatientWearablesData() {
    const [identityToken] = sharedAppleIdentityToken.useSharedState();

    return useService(async () => {
        try {
            return success(
                await fetch(`${config.wearablesDataStreamService}/api/v1/records`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${identityToken}`,
                    },
                }).then(
                    (response): Promise<WearablesDataRecord[]> =>
                        response.json().then(({ records }) => records),
                ),
            );
        } catch (err) {
            return failure('Failed to retrieve wearables data');
        }
    }, [identityToken]);
}
