"use strict";
// import axios from 'axios';
Object.defineProperty(exports, "__esModule", { value: true });
// import { container } from '../loaders';
// const { transferRecepientService } = container;
const refundService = ({ prisma, logger }) => {
    const refundInitAmount = async (event) => {
        try {
            const ref = await prisma.card_verification.findUnique({
                where: {
                    reference: event.data.reference,
                },
            });
            console.log(ref);
            if (ref) {
                await prisma.card_verification.update({
                    where: {
                        user_id: ref.user_id,
                    },
                    data: {
                        verified: true,
                    },
                });
                console.log('update Done');
                return;
                // const transferRecepient = await prisma.transfer_recipient.findUnique({
                //   where: {
                //     user_id: ref.user_id,
                //   },
                // });
            }
            else
                return false;
        }
        catch (error) {
            logger.error(error);
        }
    };
    return {
        refundInitAmount,
    };
};
exports.default = refundService;
//# sourceMappingURL=refund.js.map