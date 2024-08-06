
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNRnblobUtilTestSpec.h"

@interface RnblobUtilTest : NSObject <NativeRnblobUtilTestSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RnblobUtilTest : NSObject <RCTBridgeModule>
#endif

@end
